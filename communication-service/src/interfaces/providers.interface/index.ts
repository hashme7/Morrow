import { Redis } from 'ioredis';

export interface IRedisService {
  connect(): Promise<void>;
  publish(channel: string, message: any): Promise<void>;
  subscribe(channelPattern: string, callback: (channel: string, message: string) => void): void;
  getPublisher(): Redis;
  getSubscriber(): Redis;
  close(): Promise<void>;
}
export interface IWebSocketService{
  
}