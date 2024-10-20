import { ObjectId } from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";

export class updateFullName {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async execute(name: string, userId: ObjectId): Promise<response> {
    try {
      await this.repository.updateFullName(name, userId);
      return {
        status: 201,
        message: "full name updated success fully",
        valid: true,
      };
    } catch (error) {
      return { status: 500, message: "name updating is failed ", valid: false };
    }
  }
}
