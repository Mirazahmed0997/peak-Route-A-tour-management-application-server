import { Response } from "express";

interface Tmeta{
    page:number;
    limit:number;
    totalPage:number;
    total:number;
}

interface Tresponse<T>{
    statusCode:number;
    success:Boolean;
    message:string;
    data: T;
    meta?: Tmeta
}


export const sendResponse=<T>(res:Response,data:Tresponse<T>)=>
{
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        meta: data.meta,
        data:data.data
    })
}

