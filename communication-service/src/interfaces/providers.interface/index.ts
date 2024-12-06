import { Redis } from 'ioredis';

export interface IRedisService {
  connect(): Promise<void>;
  publish(channel: string, message: any): Promise<void>;
  subscribe(channelPattern: string, callback: (channel: string, message: string) => void): void;
  getPublisher(): Redis;
  getSubscriber(): Redis;
  close(): Promise<void>;
}
export interface IMessageWorker {
  /**
   * Starts the message worker to consume messages and periodically flush batches.
   */
  start(): void;

  /**
   * Flushes the current batch of messages to the repository.
   * @returns A promise that resolves when the batch is saved.
   */
  flushBatch(): Promise<void>;
}