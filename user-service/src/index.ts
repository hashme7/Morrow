import { createServer } from "./infrastructure/config/app";
import { DBConfig } from "./infrastructure/config/DBConfig";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const startServer = async (): Promise<void> => {
  try {
    await DBConfig();  
    const port = process.env.PORT || 3000;
    const app = createServer();
    app?.listen(port, () => {
      console.log("updated code...123");
      
      console.log(`user-service successfully running on port ${port}`)
    }
    );
  } catch (error) {
    console.log(error); 
  }
};  
 
startServer();       
       