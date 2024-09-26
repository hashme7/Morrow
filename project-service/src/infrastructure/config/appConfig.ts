import express from 'express';
import routes from '../routes/index';
import morgan from 'morgan'

export const createServer = ()=>{
    try{
        const app = express();
        app.use(express.json());
        app.use(morgan('tiny'));
        app.use('/',routes);
        return app;
    }catch(error){
        console.log(`error on spinning Project service : ${error}`)
    }
}

