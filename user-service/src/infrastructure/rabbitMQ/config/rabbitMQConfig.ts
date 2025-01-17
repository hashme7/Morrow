
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
console.log(process.env.RABBITMQ_URI);
export const rabbitMQConfig = {
  uri: process.env.RABBITMQ_URI || "amqp://localhost",
  queueName1: "project.team.creation",
  queueName2:"project.teamId.updation",
};
