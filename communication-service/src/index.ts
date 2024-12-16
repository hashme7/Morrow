import { DBConfig } from "./infrastructure/config/DBConfig";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "./infrastructure/config/app";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const startServer = async (): Promise<void> => {
  try {
    await DBConfig();
    const port = process.env.PORT || 2000;
    const app = createServer();   
    app?.listen(port, () =>
      console.log(`communication-service successfully running on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};  
   
startServer();
    