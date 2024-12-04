import { createServer } from "./infrastructure/config/appConfig";
import { DBConfig } from "./infrastructure/config/dbConfig";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, '.././.env') });

const startServer = async (): Promise<void> => {
  try {
    await DBConfig();
    const port = process.env.PORT || 1000;
    const app = createServer();
    app?.listen(port, () =>
      console.log(`auth-service successfully running on port ${port}`)
    );
  } catch (error) {
    console.log(error); 
  }
};
  
startServer();  
       