import { Server } from "socket.io";
import { RedisService } from "../../service/redis";
import { IChatRepository } from "../../../interfaces/chatRepository.interface";
import { createAdapter } from "socket.io-redis";
import { IWebSocketServer } from "../../../interfaces/providers.interface";

export class WebSocketServer implements IWebSocketServer {
  // Make io public or readonly
  public io: Server;
  public readonly MAX_RETRIES: number = 3;
  public readonly RETRY_INTERVAL: number = 5000;

  constructor(
    public port: number,
    public redisService: RedisService,
    public chatRepository: IChatRepository
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
      console.log('fkadfkjsdjf');
      const pubClient = this.redisService.getPublisher();
      const subClient = this.redisService.getSubcriber();

      // Configure Redis adapter for Socket.IO
      this.io.adapter(createAdapter({ pubClient, subClient }));

      // Configure WebSocket events
      this.configureSocketEvents();

      // Start listening on the port
      this.io.listen(this.port);
      console.log(`WebSocket server started on port ${this.port}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error starting WebSocket server: ${error.message}`);
      } else {
        console.error("Unknown error occurred while starting WebSocket server", error);
      }
      throw error;
    }
  }

  public configureSocketEvents(): void {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // User joins a room
      socket.on("joinRoom", (room: string) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
      });

      // User sends a message
      socket.on(
        "sendMessage",
        async (message: { room: string; content: string }) => {
          try {
            await this.retryWithAcknowledgment(socket, message);
          } catch (error) {
            if(error instanceof Error){
              console.error(
                `Failed to deliver message to room ${message.room}: ${error.message}`
              );
            }
          }
        }
      );

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  public async retryWithAcknowledgment(
    socket: any,
    message: { room: string; content: string }
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let attempts = 0;

      const sendEvent = () => {
        attempts++;
        console.log(`Sending message to room ${message.room}, attempt ${attempts}`);

        this.io.to(message.room).emit("receiveMessage", message.content, (ack: boolean) => {
          if (ack) {
            console.log(`Acknowledgment received for message: ${message.content}`);
            resolve();
          } else if (attempts < this.MAX_RETRIES) {
            console.log(`Retrying message delivery, attempt ${attempts}`);
            setTimeout(sendEvent, this.RETRY_INTERVAL);
          } else {
            console.error(`Failed to deliver message after ${this.MAX_RETRIES} attempts`);
            reject(new Error(`Message delivery failed for room: ${message.room}`));
          }
        });
      };
      sendEvent();
    });
  }
}
