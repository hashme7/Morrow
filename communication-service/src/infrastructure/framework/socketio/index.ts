import { Server as HTTPServer } from "http";
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
    public redisService: RedisService,
    public chatRepository: IChatRepository,
    public joinSocket: IJoinSocket,
    public updateMsgSeen: IUpdateMsgSeen,
    public httpServer:any
  ) {
    this.io = new Server(httpServer, {
      cors: {
        origin: ["https://morrow-frontend.vercel.app", "http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
      },
      path: "/communicate/message-socket",
    });
  }

  async start(): Promise<void> {
    try {
      const pubClient = this.redisService.getPublisher();
      const subClient = this.redisService.getSubscriber();

      this.io.adapter(createAdapter({ pubClient, subClient }));

      this.listenForPubSubEvents();

      this.configureSocketEvents();
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
      console.log("message formate from listenforpubsubevents:-", message);
      try {
        this.io.to(roomId).emit("new_message", message);
      } catch (error) {
        throw error;
      }
    });
  }
  public configureSocketEvents() {
    this.io.on("connection", (socket) => {

      socket.on("ping", () => {
        socket.emit("pong");
      });
      socket.on("joinRoom", async (roomId: string, userId: string) => {
        try {
          await this.redisService.addActiveUser(socket.id, userId);
          socket.join(roomId);
          await this.joinSocket.execute();
        } catch (error) {
          throw error;
        }
      });
      socket.on("userTyping", ({ userId, roomId }) => {
        console.log("Rooms:", socket.rooms);
        console.log("user is Typeing", userId, roomId);
        socket.to(roomId).emit("typing", { userId, isTyping: true });
      });
      socket.on("userStoppedTyping", ({ userId, roomId }) => {
        socket.to(roomId).emit("typing", { userId, isTyping: false });
      });

      socket.on("disconnect", async (userId) => {
        try {
          await this.redisService.removeActiveUser(socket.id, userId);
        } catch (error) {
          throw error;
        }
      });
      socket.on("message_seen", async ({ roomId,messageId, userId }) => {
        try {
          
          const seenedMsg = await this.updateMsgSeen.execute({
            messageId,
            userId,
          });
          console.log("seened Messages", seenedMsg);
          const senderId = await this.redisService.getActiveUser(userId);
          console.log("sender is found",senderId)
          if (!senderId) return;
          socket.to(roomId).emit("message_status", { seenedMsg });
        } catch (error) {
          console.log("error on message seen",error)
          throw error;
        }
      });
    });
  }
}
