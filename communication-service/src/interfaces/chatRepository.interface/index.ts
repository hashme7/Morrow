import { IMessage } from "../types/Data";

export interface IChatRepository{
    saveMessages(batchToSave:IMessage[]):Promise<void>;
}