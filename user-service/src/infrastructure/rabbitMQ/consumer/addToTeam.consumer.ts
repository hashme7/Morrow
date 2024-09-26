import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from "../config/rabbitMQConfig";
import { IUseCase } from "../../../interfaces/use-case.interface";

export class AddTeamConsumer {
  private channel!: Channel;
  private usecase!: IUseCase;
  constructor(usecase: IUseCase) {
    this.usecase = usecase;
    this.init();
  }
  private async init() {
    const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName1);
    this.startConsuming();
  }
  private async startConsuming() {
    this.channel.consume(rabbitMQConfig.queueName1, async (message) => {
      if (message) {
        try {
          const projectData = message.content.toString();
          this.channel.ack(message);
          await this.usecase.createTeam(message);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
