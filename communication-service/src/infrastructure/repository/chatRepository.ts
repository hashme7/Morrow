import ChatMessage from "../../entities_modal/chat";
import { IChatRepository } from "../../interfaces/chatRepository.interface";
import { IMessage } from "../../interfaces/types/Data";
import { SendMessageParams } from "../../interfaces/types/requestTypes";
import { GetMessageParams } from "../../interfaces/types/requestTypes";
import { GetMessagesResponse } from "../../interfaces/types/responseType";
export class ChatRepository implements IChatRepository {
  async saveMessages(batchToSave: IMessage[]): Promise<void> {
    try {
      await ChatMessage.insertMany(batchToSave);
    } catch (error) {
      console.log(`error on save message in db : ${error}`);
    }
  }
  async getMessages({
    senderId,
    receiverId,
    page = 1,
    limit = 20,
  }: GetMessageParams):Promise<GetMessagesResponse> {
    try {
      const query: Partial<IMessage> = {};
      if (senderId) query.senderId = senderId;
      if (receiverId) query.receiverId = receiverId;

      const skip = (page - 1) * limit;

      const messages = await ChatMessage.find(query)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit);

      const totalMessages = await ChatMessage.countDocuments(query);

      return {
        messages,
        metadata: {
          totalMessages,
          totalPages: Math.ceil(totalMessages / limit),
          currentPage: page,
          pageSize: messages.length,
        } ,
      };
    } catch (error) {
      console.error("Error fetching messages:", (error as Error).message);
      throw new Error("Failed to fetch messages");
    }
  }
}
