import { Types } from "mongoose";
import ChatMessage from "../../entities_modal/chat";
import { IChatRepository } from "../../interfaces/chatRepository.interface";
import { IMessage } from "../../interfaces/types/Data";

export class ChatRepository implements IChatRepository {
  async saveMessages(batchToSave: IMessage[]): Promise<void> {
    try {
      await ChatMessage.insertMany(batchToSave);
    } catch (error) {
      console.log(`error on save message in db : ${error}`);
    }
  }
  async getMessages(roomId: string, page: number=1, limit: number=20): Promise<IMessage[]> {
    try {
      const skip = (page - 1) * limit;
      const messages = await ChatMessage.find({receiverId:roomId}).sort({timestamp:-1}).skip(skip).limit(limit);
      return messages.reverse();
    } catch (error) {
      throw error;      
    }
  }
  async updateMsg(messageId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
    try {
      const updatedMsg = await ChatMessage.findByIdAndUpdate(messageId, { $addToSet: { readBy: userId } }, { new: true }).lean;
      if (updatedMsg) {
        return updatedMsg;
      } else {
        throw new Error("message not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
