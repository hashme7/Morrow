import { Connection, Channel, connect } from "amqplib";

export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;

  async connect(): Promise<void> {
    this.connection = await connect("amqp://localhost");
    this.channel = await this.connection.createChannel();
  }

  async publishMessage(queue: string, message: any): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessages(queue: string, onMessage: (msg: any) => void): Promise<void> {
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
