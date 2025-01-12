import { Request, Response } from "express";
import {
  ICheckApi,
  ISendRequest,
  IUploadApi,
  IFetchApis,
} from "../../interfaces/usecase.interface";
import { IApi } from "../../interfaces/response.interface";

export class ApiController {
  constructor(
    private sendApi: ISendRequest,
    private checkApi: ICheckApi,
    private uploadApi: IUploadApi,
    private fetchApis:IFetchApis,
  ) {}
  async sendToTargetApi(req: Request, res: Response) {
    try {
      const { url, method, body, queryParams, headers } = req.body;
      const response = await this.sendApi.execute({
        url,
        method,
        body,
        queryParams,
        headers,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log("error :", error);
      res.status(500).json("Internel Server Error");
    }
  }
  async saveApi(req: Request, res: Response) {
    try {
      const { projectId, url, method, body, response }: IApi = req.body;
      const alreadythere = await this.checkApi.execute(projectId, method, url);
      if (alreadythere) {
        console.log(alreadythere);
        res.status(302).json("API request is Already saved in Db");
      } else {
        const data = await this.uploadApi.execute({
          projectId,
          url,
          method,
          body,
          response,
        });
        if (response) {
          res.status(201).json(data);
        }
      }
    } catch (error) {
      res.status(500).json("Internel Server Error");
    }
  }
  async getApi(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const data = await this.fetchApis.execute(Number(projectId));
      res.status(200).json(data);
    } catch (error) {
     res.status(500).json("Internel Server Error");
    }
  }
}
