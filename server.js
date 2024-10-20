const  express = require('express');

const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv');
const colors=require('colors');
const path=require('path')
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
//static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
    });
// const PORT=8080 || process.env.PORT
// const PORT = process.env.PORT || 8080;
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;

//listen server
app.listen(PORT,()=>{
    console.log("hoho")
})