import {Server} from 'http';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';
import { promise } from 'zod';
import { error } from 'console';



let server : Server;
const port=5000;


const startServer= async()=>
{
 try {
       await mongoose.connect('mongodb+srv://mongoDB:mongoDB@cluster0.ljhdru4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

       console.log('Connected to DB')

       server=  app.listen(port, ()=>
    {
        console.log(`server connected to ${port}`)
    })

 } catch (error) {
    console.log(error)
 }
}

startServer();

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
