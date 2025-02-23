import { Server } from "socket.io";
import { RedisService } from "../../service/redis";
import { IChatRepository } from "../../../interfaces/chatRepository.interface";
import { createAdapter } from "socket.io-redis";
import {
  IJoinSocket,
  IUpdateMsgSeen,
} from "../../../interfaces/usecases.interface";

export class WebSocketServer {
  public io: Server;
  public readonly MAX_RETRIES: number = 3;
  public readonly RETRY_INTERVAL: number = 5000;

  constructor(
    public port: number,
    public redisService: RedisService,
    public chatRepository: IChatRepository,
    public joinSocket: IJoinSocket,
    public updateMsgSeen: IUpdateMsgSeen
  ) {
    this.io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials:true,
      },
    });
  }

  async start(): Promise<void> {
    try {
      const pubClient = this.redisService.getPublisher();
      const subClient = this.redisService.getSubscriber();

      this.io.adapter(createAdapter({ pubClient, subClient }));

      this.listenForPubSubEvents();

      this.configureSocketEvents();

      this.io.listen(this.port);
      console.log(`WebSocket server started on port ${this.port}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error starting WebSocket server: ${error.message}`);
      } else {
        console.error(
          "Unknown error occurred while starting WebSocket server",
          error
        );
      }
      throw error;
    }
  }

  public listenForPubSubEvents(): void {
    this.redisService.subscribe("channel:room:*", (channel, message) => {
      const roomId = channel.split(":")[2];
      try {
        console.log("message", message);
        this.io.to(roomId).emit("new_message", message);
      } catch (error) {
        throw error;
      }
    });
  }
  public configureSocketEvents() {
    this.io.of("/socket").on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      socket.on("ping", () => {
        socket.emit("pong");
      });

      socket.on("joinRoom", async (roomId: string, userId: string) => {
        try {
          await this.redisService.addActiveUser(socket.id, userId);
          socket.join(roomId);
          await this.joinSocket.execute();
          console.log(`User ${socket.id} joined room ${roomId}`);
        } catch (error) {
          throw error;
        }
      });

      socket.on("disconnect", async (userId) => {
        try {
          await this.redisService.removeActiveUser(socket.id, userId);
          console.log(`User disconnected: ${socket.id}`);
        } catch (error) {
          throw error;
        }
      });
      socket.on("message_seen", async ({ messageId, userId }) => {
        try {
          const seenedMsg = await this.updateMsgSeen.execute({
            messageId,
            userId,
          });
          const senderId = await this.redisService.getActiveUser(userId);
          if (!senderId) return;
          socket.to(senderId).emit("message_status", { seenedMsg });
        } catch (error) {
          throw error;
        }
      });
    });
  }
}
