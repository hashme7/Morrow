import { RabbitMQService } from ".";
import { IChatRepository } from "../../interfaces/chatRepository.interface";
import { IMessageWorker } from "../../interfaces/providers.interface";
import { IMessage } from "../../interfaces/types/Data";

export class MessageWorker implements IMessageWorker{
  private batch: IMessage[] = [];
  private readonly BATCH_SIZE = 100;
  private readonly FLUSH_INTERVAL = 50;   
  constructor(
    private rabbitMQService: RabbitMQService,
    private chatRepository: IChatRepository
  ) {
  }
  start():void{
    this.rabbitMQService.consumeMessages("chat_queue", (message: IMessage) => {
        this.batch.push(message);
        if (this.batch.length >= this.BATCH_SIZE) {
          this.flushBatch();
        }
      });
      setInterval(() => {
        if (this.batch.length > 0) {  
          this.flushBatch();
        }  
      }, this.FLUSH_INTERVAL);
  }
  async flushBatch(): Promise<void>{
    const batchToSave = [...this.batch];
    this.batch = [];
    try {
      batchToSave.forEach((message:IMessage)=>{
        message.status = 'delivered';
      })
      await this.chatRepository.saveMessages(batchToSave);
    } catch (error) {
      console.error("Error saving batch:", error);
    }
  }
}
