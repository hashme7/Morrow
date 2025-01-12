export const rabbitMQConfig = {
  uri: process.env.RABBITMQ_URI || "amqp://localhost" ,
  queueName1: "project.team.creation",
  queueName2:"project.teamId.updation",
  queueName3:"project.getProject",
};
