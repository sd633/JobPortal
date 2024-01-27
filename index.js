import express from "express";
import 'express-async-errors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
//route imports
import testRoutes from "./routes/testRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js"
import jobsRoutes from "./routes/jobsRoute.js"
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from 'express-mongo-sanitize'


//dotenv config
dotenv.config();

//Database connection
connectDB();

//rest object
const app = express();

//middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json())
app.use(cors());
app.use(morgan("dev"));

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);


//Validation middleware
app.use(errorMiddleware);  //We will not call the errorMiddleware function else it will execute right away

//PORT
const PORT = process.env.PORT || 8080

app.listen(PORT, (req,res) =>{
    console.log(`Server running on ${PORT}`);
})