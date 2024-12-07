import { Connection, Channel, connect } from "amqplib";
export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  constructor(){
    this.connect();
  }

  async connect(): Promise<void> {
    try {
      this.connection = await connect("amqp://localhost");
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
    console.log(`publishMessage:${queue}:${message}`)
    console.log("Message before sending:", JSON.stringify(message));
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consumeMessages(queue: string, onMessage: (msg: any) => void): Promise<void> {
    if (!this.channel) {
      await this.connect(); 
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      console.log(queue,msg,'queue consumed that message..')
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log(message);
        onMessage(message);
        this.channel.ack(msg);
      }
    });
  }
}
