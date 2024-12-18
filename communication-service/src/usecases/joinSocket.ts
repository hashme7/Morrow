import { IMessageWorker } from "../interfaces/providers.interface";

export class JoinSocket{
    constructor(private messageWorker:IMessageWorker){};
    async execute():Promise<void>{
        try {
           await this.messageWorker.flushBatch();
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}   