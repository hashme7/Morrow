import express from 'express';
import routes from '../routes/index';
import morgan from 'morgan'
import cors from "cors";

export const createServer = ()=>{
    try{
        const app = express();
        app.use(express.json());
        app.use(morgan('tiny'));
        app.use(
          cors({
            origin: "https://morrow-frontend.vercel.app",
            credentials: true,
          })
        );
        app.use('/',routes);
        return app;
    }catch(error){
        console.log(`error on spinning Project service : ${error}`)
    }
}

