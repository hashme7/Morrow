import amqplib, { Connection, Channel } from "amqplib";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
console.log(process.env.RABBITMQ_URL, "rabbitmq");

export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  private isConnected = false;

  async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(
        process.env.RABBITMQ_URL || "amqp://localhost"
      );
      this.channel = await this.connection.createChannel();
      this.isConnected = true;

      console.log("🐇 Connected to RabbitMQ and channel created.");

      this.connection.on("close", async () => {
        console.warn("⚠ RabbitMQ connection closed. Reconnecting...");
        this.isConnected = false;
        await this.reconnect();
      });

      this.connection.on("error", (err) => {
        console.error("❌ RabbitMQ connection error:", err);
      });
    } catch (error) {
      console.error("🚨 Error connecting to RabbitMQ:", error);
      setTimeout(() => this.reconnect(), 5000);
    }
  }

  private async reconnect() {
    if (!this.isConnected) {
      console.log("🔄 Attempting to reconnect to RabbitMQ...");
      await this.connect();
    }
  }

  async publishMessage(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      console.warn("⚠ No channel found, reconnecting...");
      await this.connect();
    }

    console.log(`📤 Publishing message to ${queue}:`, message);
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessages(
    queue: string,
    onMessage: (msg: any) => void
  ): Promise<void> {
    if (!this.channel) {
      console.warn("⚠ No channel found, reconnecting...");
      await this.connect();
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log(`📥 Received message from ${queue}:`, message);
        onMessage(message);
        this.channel.ack(msg);
      }
    });
  }
}
