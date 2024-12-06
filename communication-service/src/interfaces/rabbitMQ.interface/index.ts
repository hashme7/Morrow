export interface IRabbitMQService {
    
    connect(): Promise<void>;
    publishMessage(queue: string, message: any): Promise<void>;
    consumeMessages(queue: string, onMessage: (msg: any) => void): Promise<void>;
  }
  