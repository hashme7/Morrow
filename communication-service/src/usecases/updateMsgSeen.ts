import { Types } from "mongoose";
import { IChatRepository } from "../interfaces/chatRepository.interface";
import { IUpdateMsgSeen } from "../interfaces/usecases.interface";
import { IMessage } from "../interfaces/types/Data";

export class UpdateMsgSeen implements IUpdateMsgSeen{
    constructor(private repsitory: IChatRepository) {
        
    }
    async execute({ messageId, userId }: { messageId: string; userId: string; }): Promise<IMessage | null> {
        try {
            console.log(`                                 update mess seeen `)
            return (await this.repsitory.updateMsg(new Types.ObjectId( messageId),new Types.ObjectId(userId)));
        } catch (error) {
            console.log(`error on updat msg seen :${error}`)
            throw error;
        }
    }

}