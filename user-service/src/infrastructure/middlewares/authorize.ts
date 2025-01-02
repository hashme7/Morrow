import { NextFunction, Request, Response } from "express";
import { IRepository } from "../../interfaces/repository.interface";
export class AuthorizeMiddleware {
  constructor(private repository: IRepository) {}
  private rolePermissions: { [key: string]: string[] } = {
    developer: ["view_tasks", "update_tasks"],
    project_manager: [
      "create_tasks",
      "view_tasks",
      "update_tasks",
      "delete_tasks",
      "change_role",
      "team_member",
    ],
    team_lead: ["assign_tasks", "create_tasks", "delete_tasks", "view_tasks"],
  };
  async authorize(requiredRole: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId, teamId } = req.query;
        const role = await this.repository.getRole(
          teamId as string,
          teamId as string
        );
        if (!role)
          return res
            .status(403)
            .json({ message: "Access denied: Insufficient permissions." });
        if (this.rolePermissions[role.role].includes(requiredRole))
          return res
            .status(403)
            .json({ message: "Access denied: Insufficient permissions." });
        next();
      } catch (error) {
        throw error;
      }
    };
  }
}
