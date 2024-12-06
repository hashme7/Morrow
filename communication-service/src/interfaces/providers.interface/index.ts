import { RedisClientType } from "redis";
import { Server } from "socket.io";
import { RedisService } from "../../infrastructure/service/redis";
import { IChatRepository } from "../chatRepository.interface";

export interface IRedisService {
  connect(): Promise<void>;
  getPubClient(): RedisClientType;
  getSubClient(): RedisClientType;
}
export interface IWebSocketServer {
  // Make io private in the interface
  readonly io: Server; // Or use 'private io: Server' if necessary
  readonly MAX_RETRIES: number;
  readonly RETRY_INTERVAL: number;

  redisService: RedisService;
  chatRepository: IChatRepository;
  port: number;

  start(): Promise<void>;
  configureSocketEvents(): void;
  listenForPubSubEvents():void;
}

