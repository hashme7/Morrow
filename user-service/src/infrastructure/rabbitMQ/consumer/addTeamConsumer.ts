import amqplib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from "../config/rabbitMQConfig";
import { ICreateTeamCases } from "../../../interfaces/usecases.interface";

export class AddTeamConsumer {
  private channel!: Channel;
  private createTeamCases!: ICreateTeamCases;
  constructor(createTeamCases: ICreateTeamCases) {
    this.createTeamCases = createTeamCases;
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
      console.log(`
        
        
        consumer get the meessage from ....
        
        `)
      console.log(message)
      if (message) {
        try {
          await this.createTeamCases.execute(message);
          this.channel.ack(message);
        } catch (error) {
          console.log(error);
          throw error;
        } 
      }
    });
  }
}
