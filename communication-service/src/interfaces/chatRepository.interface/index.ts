import { IMessage } from "../types/Data";

export interface IChatRepository{
    saveMessages(batchToSave:IMessage[]):Promise<void>;
    getMessages(roomId:string,page:number,limit:number):Promise<IMessage[]>
}