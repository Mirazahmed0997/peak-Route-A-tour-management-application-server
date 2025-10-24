import {Server} from 'http';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';
import { promise } from 'zod';
import { error } from 'console';
import { envVars } from './app/Config/env';
import { seedSuperAdmin } from './app/Utils/seedSuperAdmin';



let server : Server;
const port=5000;


const startServer= async()=>
{
 try {
       await mongoose.connect(envVars.DB_URL)

       console.log('Connected to DB')

       server=  app.listen(envVars.PORT, ()=>
    {
        console.log(`server connected to ${envVars.PORT}`)
    })

 } catch (error) {
    console.log(error)
 }
}

(async()=>{
   await startServer();
   await seedSuperAdmin()
})()

// unhandled rejection error

process.on("unhandledRejection",(err)=>
{
    console.log("unhandled rejection error",err)
    if(server)
    {
        server.close(()=>
        {
            process.exit(1)
        })
        
    }
    process.exit()
})




// uncaught rejection error

process.on("uncaughtException",(err)=>
{
    console.log("uncaught exception detected error",err)
    if(server)
    {
        server.close(()=>
        {
            process.exit(1)
        })
        
    }
    process.exit()
})


// signal termination sigterm
process.on("SIGTERM",()=>
{
    console.log("sigterm signal recieved")
    if(server)
    {
        server.close(()=>
        {
            process.exit(1)
        })
        
    }
    process.exit()
})


// sigint termination sigterm
process.on("SIGINT",()=>
{
    console.log("SIGINT signal recieved")
    if(server)
    {
        server.close(()=>
        {
            process.exit(1)
        })
        
    }
    process.exit()
})


// unhandled rejection error
// Promise.reject( new Error("Forgot to catch this promise"))

// uncaught rejection error
// throw new Error("Forgot to handle uncaught error")
