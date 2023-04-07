const express=require('express');
const app=express();
const errorMiddleware=require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv=require('dotenv');
//for linking env and server.js we use
dotenv.config({path:path.join(__dirname,"config/config.env")});



app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')) ) // ipd panna dan upload file ah veliya static ah use panna mudiyum

const products=require('./routes/product');
const auth=require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

//Joining backend and frontend
if(process.env.NODE_ENV === "production"){
   app.use(express.static(path.join(__dirname,'../frontend/build')));
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
   })
}


app.use(errorMiddleware)
module.exports=app;