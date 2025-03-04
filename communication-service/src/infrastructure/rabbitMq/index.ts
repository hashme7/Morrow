import {connect, Connection, Channel } from "amqplib";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
console.log(process.env.RABBITMQ_URL, "rabbitmq");

export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    try {
      this.connection = await connect(
        process.env.RABBITMQ_URL || "amqp://localhost"
      );
      this.channel = await this.connection.createChannel();
      console.log("Connected to RabbitMQ and channel created.");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      throw error;
    }
  }

  async publishMessage(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    console.log(`publishMessage:${queue}:${message}`);
    console.log("Message before sending:", JSON.stringify(message));
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessages(
    queue: string,
    onMessage: (msg: any) => void
  ): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        onMessage(message);
        this.channel.ack(msg);
      }
    });
  }
}
