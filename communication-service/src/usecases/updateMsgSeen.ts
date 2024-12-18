import { Types } from "mongoose";
import { IChatRepository } from "../interfaces/chatRepository.interface";
import { IUpdateMsgSeen } from "../interfaces/usecases.interface";
import { IMessage } from "../interfaces/types/Data";
import { IMessageWorker } from "../interfaces/providers.interface";

export class UpdateMsgSeen implements IUpdateMsgSeen{
    constructor(private repsitory: IChatRepository) {
        
    }
    async execute({ messageId, userId }: { messageId: string; userId: string; }): Promise<IMessage | undefined> {
        try {
            console.log(`                update message ${messageId} userId: ${userId}    `)
            const updatedMsg = await this.repsitory.updateMsg(new Types.ObjectId(messageId), new Types.ObjectId(userId));
            if (updatedMsg) {
                return updatedMsg;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(`error on updat msg seen :${error}`)
            throw error;
        }
    }
  
}