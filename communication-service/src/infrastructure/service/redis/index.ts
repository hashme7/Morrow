import { Redis } from 'ioredis';

export class RedisService {
  private client: Redis;
  private subscriber: Redis;

  constructor(private host: string, private port: number, private password?: string) {
    this.client = new Redis({
      host: this.host,
      port: this.port,
      password: this.password,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000); 
        return delay;
      },
    });

    this.subscriber = new Redis({
      host: this.host,
      port: this.port,
      password: this.password,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.addErrorListeners();
  }
  async getPublisher(){
    return this.client;
  }
  async getSubcriber(){
    return this.subscriber;
  }
  async publish(channel: string, message: any): Promise<void> {
    try {
      await this.client.publish(channel, JSON.stringify(message));
      console.log(`Message published to channel: ${channel}`);
    } catch (err) {
      console.error(`Error publishing message to channel ${channel}:`, err);
    }
  }
  subscribe(channelPattern: string, callback: (channel: string, message: string) => void): void {
    this.subscriber.psubscribe(channelPattern, (err, count) => {
      if (err) {
        console.error(`Error subscribing to pattern ${channelPattern}:`, err);
      } else {
        console.log(`Subscribed to ${count} channels matching pattern: ${channelPattern}`);
      }
    });

    this.subscriber.on('pmessage', (pattern, channel, message) => {
      console.log(`Message received from channel ${channel}: ${message}`);
      callback(channel, message);
    });
  }
  private addErrorListeners(): void {
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    this.subscriber.on('error', (err) => {
      console.error('Redis subscriber error:', err);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected');
    });

    this.subscriber.on('connect', () => {
      console.log('Redis subscriber connected');
    });
  }

  async close(): Promise<void> {
    try {
      await this.client.quit();
      await this.subscriber.quit();
      console.log('Redis connections closed successfully.');
    } catch (err) {
      console.error('Error closing Redis connections:', err);
    }
  }
}
