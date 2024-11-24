import { Types } from "mongoose";
import { ChatMessage } from "./types/entities_modal.types";


export interface IMessageRepository{
    findByTeamId(teamId:Types.ObjectId):Promise<ChatMessage[]>
}

