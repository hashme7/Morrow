import { createServer } from "./infrastructure/config/appConfig";
import dotenv from "dotenv";
import path from "path";
import { DBConfig } from "./infrastructure/config/DBconfig";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const startServer = async () => {
  try {
    DBConfig();
    const app = createServer();
    const port = process.env.PORT || 4000;
    console.log("updated...1")
    app?.listen(port,()=>{
      console.log(`project-service successfully running on port ${port}`)
    })
  } catch (error) {
    console.log(`Project service : Error on starting server ${error}`)
  }
};  

startServer();   
