const  express = require('express');

const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv');
const colors=require('colors');
const app=express();
const connectDb=require('./config/connectDb')
dotenv.config();
//database call
connectDb();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//user routes
app.use('/api/v1/users',require('./routes/userRoute'))
//transaction routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes'))
//port
const PORT=8080 || process.env.PORT
//listen server
app.listen(PORT,()=>{
    console.log("hoho")
})