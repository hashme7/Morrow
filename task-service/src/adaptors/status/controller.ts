import { Request, Response } from "express";
import { IStatusRepository } from "../../interfaces/statusRepository.interface";

export class StatusController {
    constructor(private statusRep:IStatusRepository){};
    create(req:Request,res:Response){
        try {
            
        } catch (error) {
            res.status(500).json('Internel Server Error');
        }
    }
}