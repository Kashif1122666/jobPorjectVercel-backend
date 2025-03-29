import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRoute from "./routes/user.routes.js"
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import { Job } from './models/job.model.js';
import path  from 'path';

// Import all models
import { User } from "./models/user.model.js"; 
import { Application } from "./models/application.model.js";
dotenv.config({});
const app = express();

const _dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));



connectDB()






//api's 

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use('/api/v1/application',applicationRoute);




app.get('/home' ,(req,res)=>{
  res.status(200).json({
    message:"i am backend"
  })
});
 


const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`   )},
);

