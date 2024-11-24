import mongoose, { ObjectId } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";

export class GetUser {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }
  async execute(userId: mongoose.Types.ObjectId): Promise<response> {
    try {
      const data = await this.repository.getUser(userId);
      if (data) {
        return { status: 200, message: "data fetched.", data: data };
      } else {
        return { status: 204, message: "No Content", data: null };
      }
    } catch (error) {
      console.log(`errror on GetUser : ${error}`);
      return {
        status: 500,
        message: `error on GetUser : ${error}`,
        data: null,
      };
    }
  }
}
