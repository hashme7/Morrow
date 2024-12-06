import { SendMessageReturn } from '../types/responseType';
import { SendMessageParams } from '../types/requestTypes';
export interface ISendMessage{
    execute(message:SendMessageParams):Promise<SendMessageReturn>
}