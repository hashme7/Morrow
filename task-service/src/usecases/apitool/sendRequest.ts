import { targetDetails } from "../../interfaces/response.interface";
import axios, { AxiosResponse } from "axios";
import { ISendRequest } from "../../interfaces/usecase.interface";

export class SendRequest implements ISendRequest {
  constructor() {}
  async execute(targetDetails: targetDetails) {
    const validHeaders = targetDetails.headers
      ? Object.fromEntries(
          Object.entries(targetDetails.headers).filter(
            ([key, value]) =>
              typeof key === "string" &&
              key.trim() !== "" &&
              typeof value === "string" &&
              value.trim() !== ""
          )
        )
      : { "Content-Type": "application/json" };

    const validParams = targetDetails.queryParams
      ? Object.fromEntries(
          Object.entries(targetDetails.queryParams).filter(
            ([key, value]) =>
              typeof key === "string" &&
              key.trim() !== "" &&
              typeof value === "string" &&
              value.trim() !== ""
          )
        )
      : {};

    const startTime = performance.now();
    try {
      const response: AxiosResponse = await axios({
        url: targetDetails.url,
        method: targetDetails.method,
        data: targetDetails.body,
        headers: validHeaders,
        params: validParams,
      });
      const endTime = performance.now();
      const time = Math.round(endTime - startTime);
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: response.data,
        time,
      };
    } catch (error: any) {
      const endTime = performance.now();
      const time = Math.round(endTime - startTime);
     
      if (error) {
        return {
          status: error.response?.status,
          headers: error.response?.headers,
          body: error.response?.data || error.response?.statusText,
          time,
        };
      }
      console.log("error on",error);
      
      throw new Error(
        error.message || "Unexpected error occurred while sending API request."
      );
    }
  }
}
