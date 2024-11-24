import { IRepository } from "../interfaces/repository.interface";

export class GetAllUsers {
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }
  async execute(page: number, limit: number) {
    try {
      const totalUsers = await this.repository.countAllUsers();
      const offset = (page - 1) * limit;
      const paginatedUsers = await this.repository.findAllUsers(offset, limit);
      if (!paginatedUsers.length) {
        return {
          status: 404,
          message: "No users found.",
        };
      }
      return {
        status: 200,
        message: "Users retrieved successfully.",
        data: paginatedUsers,
        totalItems: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      };
    } catch (error) {
      console.log(`Error on get all users  : ${error}`);
      return {
        status: 500,
        message: `Internel server error on get all user: ${error}`,
      };
    }
  }
}
