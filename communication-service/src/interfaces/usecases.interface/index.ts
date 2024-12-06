import { SendMessageReturn } from '../types/responseType';
import { IMessage } from '../types/Data';
export interface ISendMessage{
    execute(message:IMessage):Promise<SendMessageReturn>
}
export interface IJoinSocket{
    execute():Promise<void>;
}
export interface IGetMessage{
    execute(roomId:string,page:number):Promise<IMessage[]>
}