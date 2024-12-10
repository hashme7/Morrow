import { ICreateTask, IDeleteTask } from "../../interfaces/usecase.interface";
import { Request, Response } from "express";
import {ObjectId} from 'mongodb'

export class TaskController {
  constructor(private readonly createTaskUseCase: ICreateTask,private readonly deleteTaskUseCase:IDeleteTask) {}

  async createTask(req: Request, res: Response) {
    try {
      const taskData = req.body;
      const newTask = await this.createTaskUseCase.execute(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(`Error creating task: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async deleteTask(req:Request,res:Response){
    try {
      const {taskId} = req.query;
      await this.deleteTaskUseCase.execute(new ObjectId(taskId as string));
      res.status(304).json({message:"task delete succesfully"});
    } catch (error) {
      console.log(`error on deleting the task :${error}`);
      throw error;
    }
  }
}
