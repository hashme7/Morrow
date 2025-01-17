import { Redis } from "ioredis";
import { IRedisService } from "../../../interfaces/providers.interface";
// import { RedisClientType } from "redis";
// import { IMessage } from "../../../interfaces/types/Data";

export class RedisService implements IRedisService {
  private client: Redis;
  private subscriber: Redis;

  constructor(
    private host: string,
    private port: number,
    private password?: string
  ) {
    this.client = new Redis({
      host: this.host,
      port: this.port,
      password: this.password,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      stringNumbers: false,
    });

    this.subscriber = new Redis({
      host: this.host,
      port: this.port,
      password: this.password,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      stringNumbers: false,
    });

    this.addErrorListeners();
  }
  async addActiveUser(socketId:string,userId:string): Promise<void> {
    try {
      await this.client.set(userId, socketId);
      console.log(`User ${userId} added to active users.`);
    } catch (error) {
      console.log(`Error on adding active user to redis service`);
      throw error
    }
  }
  async removeActiveUser(socketId: string, userId: string): Promise<void>{
    try {
      await this.client.del(userId, socketId);
      console.log(`User ${userId} removed from active users`);
    } catch (error) {
      console.log(`error on removing the active user from redis service`);
      throw error;
    }
  }
  async getActiveUser(userId: string): Promise<string | null>{
    try {
      return await this.client.get(userId);
    } catch (error) {
      throw error;
    }
  }
  async connect(): Promise<void> {
    try {
      await this.client.ping();
      console.log("Redis client connected",`
        
        
        ${this.port},${this.host} fjaskd`);
    } catch (error) {
      console.error("Error connecting to Redis:", error);
      throw error;
    }
  }

  getSubscriber(): Redis {
    return this.subscriber;
  }
  getPublisher() {
    return this.client;
  }
  async publish(channel: string, message: any): Promise<void> {
    try {
      await this.client.publish(channel, JSON.stringify(message));
      console.log(`Message published to channel: ${channel}`);
    } catch (err) {
      console.error(`Error publishing message to channel ${channel}:`, err);
    }
  }
  subscribe(
    channelPattern: string,
    callback: (channel: string, message: string) => void
  ): void {
    this.subscriber.psubscribe(channelPattern, (err, count) => {
      if (err) {
        console.error(`Error subscribing to pattern ${channelPattern}:`, err);
      } else {
        console.log(
          `Subscribed to ${count} channels matching pattern: ${channelPattern}`
        );
      }
    });

    this.subscriber.on("pmessage", (pattern, channel, message) => {
      try {
        const parsedMessage = JSON.parse(message); 
        console.log(`parsed message from subscriber`,parsedMessage);
        callback(channel, parsedMessage);
      } catch (error) {
        console.log(`error pmessage subsriber`) 
      }
    });
  }
  isValidJSON(message: string): boolean {
    try {
      JSON.parse(message);
      return true;
    } catch {
      return false;
    }
  }
  private addErrorListeners(): void {
    this.client.on("error", (err) => {
      console.error("Redis client error:", err);
    });

    this.subscriber.on("error", (err) => {
      console.error("Redis subscriber error:", err);
    });

    this.client.on("connect", () => {
      console.log("Redis client connected",this.host,this.port);
    });

    this.subscriber.on("connect", () => {
      console.log("Redis subscriber connected");
    });
  }

  async close(): Promise<void> {
    try {
      await this.client.quit();
      await this.subscriber.quit();
      console.log("Redis connections closed successfully.");
    } catch (err) {
      console.error("Error closing Redis connections:", err);
    }
  }
}
