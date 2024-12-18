import { Redis } from 'ioredis';
import { Server } from 'socket.io';
import { IChatRepository } from '../chatRepository.interface';
import { IMessage } from '../types/Data';

export interface IRedisService {
  connect(): Promise<void>;
  publish(channel: string, message: any): Promise<void>;
  subscribe(channelPattern: string, callback: (channel: string, message: string) => void): void;
  isValidJSON(message:string):boolean;
  getPublisher(): Redis;
  getSubscriber(): Redis;
  close(): Promise<void>;
  addActiveUser(socketId: string, userId: string): Promise<void>;
  removeActiveUser(socketId: string, userId: string): Promise<void>;
  getActiveUser(userId: string): Promise<string | null>;
}
export interface IMessageWorker {
  start(): void;
  flushBatch(): Promise<void>;
}

export interface IWebSocketServer {
  io: Server;
  readonly MAX_RETRIES: number;
  readonly RETRY_INTERVAL: number;
  port: number;
  redisService: IRedisService;
  chatRepository: IChatRepository;
  isValidJSON():Promise<void>;
  start(): Promise<void>;
  listenForPubSubEvents(): void;
  configureSocketEvents(): void;
}