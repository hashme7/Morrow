import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import mongoose from "mongoose";
import {UserRequest,TeamResponse} from 'morrow-common'

export interface IUserServiceHandler {
    GetTeamIds(
      call: ServerUnaryCall<UserRequest, TeamResponse>,
      callback: sendUnaryData<{ team_id: mongoose.Types.ObjectId }[]>
    ): Promise<void>;
  }