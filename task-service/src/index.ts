import { createServer } from "./infrastructure/config/app";
import dotenv from "dotenv";
import path from "path";
import { DBConfig } from "./infrastructure/config/dbConfig";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const startServer = async () => {
  try {
    DBConfig();
    const app = createServer();
    const port = process.env.PORT || 5000;
    console.log("updating...111");
    
    app?.listen(port, () => {
      console.log(`task-service() successfully running on port ${port}`);
    });
  } catch (error) {
    console.log(`task service : Error on starting server ${error}`);
  }
};

startServer();
   