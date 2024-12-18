import { RabbitMQService } from ".";
import { IChatRepository } from "../../interfaces/chatRepository.interface";
import { IMessage } from "../../interfaces/types/Data";

export class MessageWorker {
  private batch: IMessage[] = [];
  private readonly BATCH_SIZE = 200;
  private readonly FLUSH_INTERVAL = 200;
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
      console.log("Batch saved successfully");
    } catch (error) {
      console.error("Error saving batch:", error);
    }
  }
}
