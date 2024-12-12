import { Request, Response } from "express";
import { ICreateStatus, IDeleteStatus, IGetStatus, IUpdateStatus } from "../../interfaces/usecase.interface";
import mongoose from "mongoose";

export class StatusController {
  constructor(
    private createStatus: ICreateStatus,
    private getStatus:IGetStatus,
    private updateStatus :IUpdateStatus,
    private deleteStatus:IDeleteStatus,
  ) {}
  async create(req: Request, res: Response) {
    try {
      const statusData = req.body;
      console.log(statusData,"afdsjfaksdjf")
      const newStatus = await this.createStatus.execute(statusData);
      res.status(201).json({data:newStatus});
    } catch (error) {
      res.status(500).json("Internel Server Error");
    }
  }
  async get(req:Request,res:Response){
    try {
      const {team_id}= req.params;
      const status = await this.getStatus.execute(new mongoose.Types.ObjectId(team_id));
      res.status(200).json({data:status});
    } catch (error) {
      res.status(500).json("Internel Server Error")
    }
  }
  async update(req:Request,res:Response){
    try {
      const {team_id} = req.params;
      const {name,id} = req.body;
      const updatedStatus = await this.updateStatus.execute(new mongoose.Types.ObjectId(team_id),name as string, id as string);
      res.status(200).json({data:updatedStatus});
    } catch (error) {
      res.status(500).json("Internel Server Error")
    }
  }
  async delete(req:Request,res:Response){
    try {
      const {team_id}= req.params;
      const {id} = req.query;
      await this.deleteStatus.execute(new mongoose.Types.ObjectId(team_id),id as string);
      res.status(200).json({data:id});
    } catch (error) {
      res.status(500).json("Internel Server Error")
    }
  }
}
