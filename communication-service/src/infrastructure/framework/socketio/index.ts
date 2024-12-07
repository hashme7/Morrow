import { Server } from "socket.io";
import { RedisService } from "../../service/redis";
import { IChatRepository } from "../../../interfaces/chatRepository.interface";
import { createAdapter } from "socket.io-redis";
import { IJoinSocket } from "../../../interfaces/usecases.interface";

export class WebSocketServer {
  public io: Server;
  public readonly MAX_RETRIES: number = 3;
  public readonly RETRY_INTERVAL: number = 5000;

  constructor(
    public port: number,
    public redisService: RedisService,
    public chatRepository: IChatRepository,
    public joinSocket: IJoinSocket
  ) {
    this.io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
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
      console.log("Raw message received:", message);
      const roomId = channel.split(":")[2];
      this.io.to(roomId).emit("new_message", JSON.parse(message));
    });
  }

  public configureSocketEvents() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("joinRoom", async (roomId: string) => {
        socket.join(roomId);
        await this.joinSocket.execute();
        console.log(`User ${socket.id} joined room ${roomId}`);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}
