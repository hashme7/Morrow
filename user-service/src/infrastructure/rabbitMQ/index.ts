import amqplib, { Connection, Channel } from "amqplib";
import { rabbitMQConfig } from "./config/rabbitMQConfig";
import {delay} from 'morrow-common/dist'

export class RabbitMQService {
  private connection: Connection | undefined;
  private channel: Channel | undefined;
  private maxRetries: number = 5;
  private retryDelay: number = 2000;
  constructor() {
    this.connect();
  }
  private async connect(attempt: number = 1): Promise<void> {
    try { 
      this.connection = await amqplib.connect(rabbitMQConfig.uri!);
      this.channel = await this.connection.createChannel();
      console.log(`RabbitMQ is connected successfully.`);
    } catch (error) {
      console.log(`Error connecting RabbitMQ: ${error}`);
      if (attempt <= this.maxRetries) {
        console.log(
          `Retrying to connect to RabbitMQ in ${
            this.retryDelay / 1000
          } seconds...`
        );
        await delay(this.retryDelay);
        return this.connect(attempt + 1);
      } else {
        console.log(`Error on connecting RabbitMq ${error}`);
        throw error;
      }
    }
  }
  async publish(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel not initialized. Call connect() before publishing.");
    }
    try {
      await this.channel.assertQueue(queue, { durable: true });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`Message sent to queue ${queue}: `, message);
    } catch (error) {
      console.log(`Failed to send message to queue ${queue}: ${error}`);
      throw error;
    }
  }
}
