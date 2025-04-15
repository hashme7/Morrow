import {
  ICahngeTaskStatus,
  ICreateTask,
  IDeleteTask,
  IFetchTask,
} from "../../interfaces/usecase.interface";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export class TaskController {
  constructor(
    private readonly createTaskUseCase: ICreateTask,
    private readonly deleteTaskUseCase: IDeleteTask,
    private fetchTask: IFetchTask,
    private changeTaskStatus: ICahngeTaskStatus
  ) {}

  async createTask(req: Request, res: Response) {
    try {
      const team_id = req.params.teamId as string;
      const status = req.query.status as string;
      const name = req.query.name as string;
      const priority = req.query.priority as string;
      const { assignee } = req.body;
      const typedAssignee = assignee.map((id: string) => {
        return new Types.ObjectId(id);
      });
      const newTask = await this.createTaskUseCase.execute({
        status: new Types.ObjectId(status),
        name,
        priority,
        teamId: new Types.ObjectId(team_id),
        assignee: typedAssignee,
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.error(`Error creating task: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getTask(req: Request, res: Response) {
    try {
      const { teamId } = req.params;
      console.log("task teamid", teamId);
      const tasks = await this.fetchTask.execute(new ObjectId(teamId));
      res.status(200).json(tasks);
    } catch (error) {
      console.log(`Error on get Task :${error}`);
      res.status(500).json({ message: "Internel server error" });
    }
  }
  async updateStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.query;
      const { team_id } = req.params;
      console.log("ad:LlllLLL::: ",id, status, team_id);
      const updatedTask = await this.changeTaskStatus.execute(
        id as string,
        team_id as string,
        status as string
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      console.log(`Error on update status Task :${error}`);
      res.status(500).json({ message: "Internel server error" });
    }
  }
  async deleteTask(req: Request, res: Response) {
    try {
      const { taskId } = req.query;
      await this.deleteTaskUseCase.execute(new ObjectId(taskId as string));
      res.status(304).json({ message: "task delete succesfully" });
    } catch (error) {
      console.log(`error on deleting the task :${error}`);
      throw error;
    }
  }
}
