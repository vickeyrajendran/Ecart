const app=require('./app');
const path=require('path');
const connectDatabase = require('./config/database');



connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running :${process.env.PORT} in ${process.env.NODE_ENV}`);
})

// find error in DB_LOCAL_URI= mongodb://127.0.0.1:27017/project

process.on('unhandledRejection',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('Shutting down the server due to unhandlerejection Error');
    server.close(()=>{
        process.exit(1);
    })
})

    // find error in  console.log(a); lke ts error

    process.on('uncaughtException',(err)=>{
        console.log(`Error:${err.message}`);
        console.log('Shutting down the server due to uncaughtException Error');
        server.close(()=>{
            process.exit(1);
        })
})

