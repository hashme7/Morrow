import { IChatRepository } from "../interfaces/chatRepository.interface";
import { IGetMessage } from "../interfaces/usecases.interface";

export class FetchMessages implements IGetMessage{
    constructor(private chatRepository :IChatRepository){};
    async execute(roomId:string,page:number){
        try {
            return (await this.chatRepository.getMessages(roomId,page,20));
        } catch (error) {
            throw error;
        }
    };
}   