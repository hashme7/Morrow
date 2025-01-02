import { ObjectId, Types } from "mongoose";

export interface ISubTask {
  name: string;
  description: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  createdAt: Date;
  updatedAt: Date;
  taskId: ObjectId;
  priority: string;
  status: ObjectId;
}

export interface ITask extends Document {
  teamId: ObjectId;
  name: string;
  status: ObjectId;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  subTaskIds: Array<ISubTask>;
  assignee: { _id: Types.ObjectId }[];
}
export interface IReqTask {
  teamId: Types.ObjectId;
  name: string;
  status: Types.ObjectId;
  priority: string;
  assignee: { _id: Types.ObjectId }[];
}
export interface IAssigned extends Document {
  task_id: ObjectId;
  userAccountId: ObjectId;
  roleId: ObjectId;
  assignedAt: Date;
  status: string;
}
export interface IStatus extends Document {
  name: string;
  id: string;
  team_id: ObjectId;
  color: string;
}
export type IDefaultStatus = {
  name: string;
  id: string;
  color: string;
  team_id?: ObjectId;
};
export interface TransformedTask extends Omit<ITask, "status"> {
  status: string | null;
}

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}
export interface NodeData {
  collectionName?: string;
  fields?: any[];
  data?: any;
}
export interface Node {
  data: NodeData;
  dragging: boolean;
  id: string;
  measured: { width: string; height: number };
  position: { x: number; y: number };
  selected: boolean;
  type: string;
}
export interface Edges {
  animated: boolean;
  id: string;
  source: string;
  sourceHandle: string;
  style: { stroke: string };
  target: string;
  targetHandle: string;
}
export interface IDbDesign extends Document {
  projectId: number;
  nodes: Node[];
  edges: Edges[];
  viewport: Viewport;
}