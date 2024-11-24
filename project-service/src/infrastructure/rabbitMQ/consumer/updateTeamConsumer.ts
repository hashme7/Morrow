import { IUpdateProjectCases } from "../../../interfaces/usecase.interface";
import amqblib, { Channel, Connection } from "amqplib";
import { rabbitMQConfig } from "../config/rabbitMQConfig";
import { ITeamIdRes } from "../../../interfaces/Types/response.interface";

export class UpdateTeamConsumer {
  private channel!: Channel;
  private  readonly updateTeamCases!: IUpdateProjectCases;
  constructor(updateTeamCases:IUpdateProjectCases) {
    this.updateTeamCases = updateTeamCases;
    this.init();
  }
  private async init() {
    const connection :Connection = await amqblib.connect(rabbitMQConfig.uri);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(rabbitMQConfig.queueName2);
    this.startConsuming();
  }
  private async startConsuming(){
    this.channel.consume(rabbitMQConfig.queueName2,async(message)=>{
        if(message){
            try {
                this.channel.ack(message);
                await this.updateTeamCases.execute(message);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    })
  }
}
