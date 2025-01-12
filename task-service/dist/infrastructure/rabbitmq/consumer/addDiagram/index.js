"use strict";
// import amqplib, { Channel, Connection } from "amqplib";
// import { rabbitMQConfig } from "../../config";
// import { ICreateDiagram } from "../../../../interfaces/usecase.interface";
// import { IDBRepository } from "../../../../interfaces/DBRepository";
// interface Message {
//   projectId: number; // Assuming `project.id` is a number
//   projectName: string; // Assuming `project.name` is a string
//   userId: number | string; // Adjust this based on the actual type of `userId`
// }
// export class AddDiagramConsumer {
//   private channel!: Channel;
//   constructor(private dbRepository: IDBRepository) {
//     this.init();
//   }
//   private async init() {
//     const connection: Connection = await amqplib.connect(rabbitMQConfig.uri);
//     this.channel = await connection.createChannel();
//     await this.channel.assertQueue(rabbitMQConfig.addDiagram);
//     this.startConsuming();
//   }
//   private async startConsuming() {
//     this.channel.consume(rabbitMQConfig.addDiagram, async (message) => {
//       if (message) {
//           try {
//               const response:Message = JSON.parse(message.content.toString());
//               //   await this.createDiagramCases.execute({projectId:response.projectId,nodes:[],edges:[],viewport:{x:0,y:0,zoom:0}} )
//               await this.dbRepository.save();
//         } catch (error) {
//           throw error;
//         }
//       }
//     });
//   }
// }
