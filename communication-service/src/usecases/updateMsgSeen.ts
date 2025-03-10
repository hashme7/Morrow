import { Types } from "mongoose";
import { IChatRepository } from "../interfaces/chatRepository.interface";
import { IUpdateMsgSeen } from "../interfaces/usecases.interface";
import { IMessage } from "../interfaces/types/Data";

export class UpdateMsgSeen implements IUpdateMsgSeen {
  constructor(private repository: IChatRepository) {}
  async execute({
    messageId,
    userId,
  }: {
    messageId: string;
    userId: string;
  }): Promise<IMessage | undefined> {
    let attempts = 0;
    const maxRetries = 5;
    const retryDelay = 300;

    while (attempts < maxRetries) {
      try {
        const updatedMsg = await this.repository.updateMsg(
          new Types.ObjectId(messageId),
          new Types.ObjectId(userId)
        );

        if (updatedMsg) {
          console.log("Message seen updated:", updatedMsg);
          return updatedMsg;
        }
      } catch (error) {
        console.log(`Error updating message seen status: ${error}`);
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      attempts++;
    }

    console.log(
      `Failed to update seen status for message ${messageId} after ${maxRetries} retries`
    );
    return undefined;
  }
}
