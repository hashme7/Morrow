import { Server } from "socket.io";
import { RedisService } from "../../service/redis";
import { IChatRepository } from "../../../interfaces/chatRepository.interface";
import { createAdapter } from "socket.io-redis";
import { IWebSocketServer } from "../../../interfaces/providers.interface";
import { timeStamp } from "console";

export class WebSocketServer implements IWebSocketServer {
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

      this.io.adapter(createAdapter({ pubClient, subClient }));

      this.listenForPubSubEvents();

      this.configureSocketEvents();

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

  public listenForPubSubEvents(): void {
    this.redisService.subscribe("chat:room:*", (channel, message) => {
      const roomId = channel.split(":")[1]; 
      this.io.to(roomId).emit("new_message", JSON.parse(message));
    });
  }

  public configureSocketEvents(){
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });

      socket.on('sendMessage',async(message:{receiverId:string,content:string})=>{
        try {
          const event = {receiverId:message.receiverId,content:message.content,timeStamp:new Date().toISOString()};
          await this.redisService.publish(`chat:room:${message.receiverId}`, event);
        } catch (error) {
          console.error("Error processing sendMessage event:", error);
        }
      })

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}
