import { DBConfig } from "./infrastructure/config/DBConfig";
import { createServer } from "./infrastructure/config/app";
import dotenv from "dotenv";
import path from "path";
import { WebSocketServer } from "./infrastructure/framework/socketio";
import { chatRepository, joinSocket, redisService, updateMsgSeen } from "./providers/controller";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const startServer = async (): Promise<void> => {
  try {
    await DBConfig();
    const port = process.env.PORT || 2000;
    const app = createServer();  
    const instance = app?.listen(port, () =>
      console.log(`communication-service successfully running on port ${port}`)
    );
    if (instance) {
      const webSocketService = new WebSocketServer(
        redisService,
        chatRepository,
        joinSocket,
        updateMsgSeen,
        instance,
      );
      webSocketService.start();
    }
  } catch (error) {
    console.log(error);
  }  
};      
   
startServer();
    