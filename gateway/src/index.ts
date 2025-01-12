import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {authenticate} from "morrow-common/dist"

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173" ,"https://morrow-frontend.vercel.app"],  
    credentials: true,  
  };

app.use(cors(corsOptions));   
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/project',authenticate,proxy('http://localhost:4000'));   
app.use('/user',authenticate,proxy('http://localhost:3000'));
app.use('/communicate',authenticate,proxy('http://localhost:2000'));
app.use('/task',proxy('http://localhost:5000'));
app.use('/',proxy('http://localhost:9090'));
   
app.listen(8000,()=>{
    console.log(`gateway service is running on port :http://localhost:8000`)
})     