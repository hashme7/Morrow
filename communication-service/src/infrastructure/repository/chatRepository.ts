import  messages  from "../../entities_modal/chat";
import { ChatMessage } from "../../interfaces/types/entities_modal.types";
import {IMessageRepository} from '../../interfaces/IMessageRepository';

export interface ChatRepository {
  saveMessage(message: ChatMessage): Promise<void>;
  getMessagesByTeam(teamId: string): Promise<ChatMessage[]>;
}

export class InMemoryChatRepository implements ChatRepository {
    constructor(private readonly messages:IMessageRepository){
        this.messages = messages
    }

  async saveMessage(message: ChatMessage): Promise<void> {
    this.messages.push(message);
  }

  async getMessagesByTeam(teamId: string): Promise<ChatMessage[]> {
    return this.messages.findByTeamId({teamId:teamId});
  }
}
