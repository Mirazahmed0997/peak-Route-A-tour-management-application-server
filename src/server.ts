import {Server} from 'http';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';



let server : Server;
const port=5000;
const app= express();

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


app.get('/',(req:Request,res:Response)=>
{
    res.status(200).json({
        message: "welcome To Tour managment"
    })
})



