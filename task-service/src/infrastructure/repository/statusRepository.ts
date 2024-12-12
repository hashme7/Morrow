import { Status } from "../../entities_models/status";
import { IDefaultStatus, IStatus } from "../../interfaces/response.interface";
import { IStatusRepository } from "../../interfaces/statusRepository.interface";
import mongoose from "mongoose";
export class StatusRepository implements IStatusRepository {
  private defaultStatus: IDefaultStatus[] = [
    { id: "todo", name: "To Do", color: "#8B5CF6" },
    { id: "on-progress", name: "On Progress", color: "#3B82F6" },
    { id: "completed", name: "Completed", color: "#22C55E" },
  ];
  constructor() {}
  async findOneAndDelete(
    team_id: mongoose.Types.ObjectId,
    id: string
  ): Promise<void> {
    try {
      await Status.deleteOne({ team_id: team_id, id: id });
    } catch (error) {
      console.log("error deleting status", error);
      throw error;
    }
  }
  async seedStatus() {
    for (const status of this.defaultStatus) {
      const exists = await Status.findOne({ id: status.id });
      if (!exists) {
        await Status.create(status);
      }
    }
  }
  async findManyStatus(team_id: mongoose.Types.ObjectId): Promise<IStatus[]> {
    try {
      for (const status of this.defaultStatus) {
        const exists = await Status.findOne({
          id: status.id,
          team_id: team_id,
        });
        if (!exists) {
          await Status.create({ ...status, team_id: team_id });
        } else {
          return await Status.find({ team_id: team_id });
        }
      }
      return await Status.find({ team_id: team_id });
    } catch (error) {
      console.log("error finding status", error);
      throw error;
    }
  }
  async insertStatus(status: IStatus): Promise<IStatus> {
    try {
      console.log(status.color, "statuscolor");
      const newStatus = new Status(status);
      const savedStatus = await newStatus.save();
      if (savedStatus) {
        return savedStatus;
      } else {
        throw new Error("Status is not created");
      }
    } catch (error) {
      console.log("error on insertStatus", error);
      throw error;
    }
  }
  async findAStatus(
    id: string,
    team_id: mongoose.Types.ObjectId
  ): Promise<IStatus | null> {
    try {
      return await Status.findOne({ id: id, team_id: team_id });
    } catch (error) {
      console.log("error on finding status");
      throw error;
    }
  }
  async findStatusAndUpdate(
    team_id: mongoose.Types.ObjectId,
    name: string,
    id: string
  ): Promise<IStatus> {
    try {
      const updatedStatus = await Status.findOneAndUpdate(
        { team_id: team_id, id: id },
        { $set: { name: name } },
        { new: true },
      );
      if (updatedStatus) {
        return updatedStatus;
      } else {
        throw new Error("can t able update the status");
      }
    } catch (error) {
      console.log("error on upating staus");
      throw error;
    }
  }
}
