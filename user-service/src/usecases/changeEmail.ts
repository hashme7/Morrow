import mongoose from "mongoose";
import { IRepository } from "../interfaces/repository.interface"
import { response } from "../interfaces/types/response";

export class ChangeEmail {
    private readonly repository:IRepository;
    constructor(repository:IRepository){
        this.repository = repository;
    }
    async execute(userId : mongoose.Types.ObjectId,email:string):Promise<response>{
        try {
            const user = await this.repository.findByEmail(email);
            if(!user){
               const updatedUser = await this.repository.changeEmail(userId,email);
                return {status:200,message:"update successfully",data:updatedUser};
            }else{
                return {status:403,message:"user already there"};
            }
        } catch (error) {
            console.log(`Error on changing email: ${email}`)
            throw error;
        }
    }
}