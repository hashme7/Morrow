import { IWebSocketServer } from "../../interfaces/providers.interface";

export class ChatController{
    constructor(private webSocketServer:IWebSocketServer){
        this.webSocketServer.start();
    };
    sendMessage(projectId,userId,message){
        try {
            
        } catch (error) {
            
        }
    }
}
