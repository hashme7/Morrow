import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import morgan from 'morgan'

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",  
    credentials: true,  
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/project',proxy('http://localhost:4000'));
app.use('/',proxy('http://localhost:3000'));


app.listen(8000,()=>{
    console.log(`gateway service is running on port :http://localhost:8000`)
})