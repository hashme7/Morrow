import { SendMessageReturn } from '../types/responseType';
import { SendMessageParams } from './../types/requestTypes/index';
export interface ISendMessage{
    execute(__0:SendMessageParams):Promise<SendMessageReturn>
}