import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";
import { IRejectRequest } from "../interfaces/usecases.interface";
import { ObjectId } from "mongodb";

export class RejectRequest implements IRejectRequest{
    constructor(private readonly repository:IRepository){}
    async execute(requestId:string):Promise<response>{
        try {
            await this.repository.deleteRequest(new ObjectId(requestId));
            return {status:204,message:"rejected successfully"}
        } catch (error) {
            console.log(`error on rejecting request.....`)
            throw error;
        }
    }
}