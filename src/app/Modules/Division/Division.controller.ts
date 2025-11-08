import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { DivisionService } from "./Division.service"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from "http-status-codes"





const createDivision= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
    {
        const user = await DivisionService.createDivision(req.body)
          
    
            // res.status(httpStatus.CREATED).json({
            //     message: "User successfully created"
            // })
            sendResponse(res,{
                success:true,
                statusCode:httpStatus.CREATED,
                message:"Division Create successfully",
                data:user,
            })
    })

const getDivision= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
    {
        const divisions = await DivisionService.getAllDivisions()
          
    
            // res.status(httpStatus.CREATED).json({
            //     message: "User successfully created"
            // })
            sendResponse(res,{
                success:true,
                statusCode:httpStatus.CREATED,
                message:"Get all Division successfully",
                data:divisions,
            })
    })


    const updateDivision = catchAsynch(
        async (req: Request, res: Response, next: NextFunction) => {
          const { id } = req.params; // ✅ get division ID from URL
          const payload = req.body;  // ✅ get update data from request body
      
          // ✅ call service with both id and payload
          const updatedDivision = await DivisionService.updateDivision(id as string, payload);
      
          // ✅ send proper response
          sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, // use 200 for update
            message: "Division updated successfully",
            data: updatedDivision,
          });
        }
      );

    const deleteDivision = catchAsynch(
        async (req: Request, res: Response, next: NextFunction) => {
          const { id } = req.params; // ✅ get division ID from URL
      
          const deletedDivision = await DivisionService.deleteDivision(id as string);
      
          // ✅ send proper response
          sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, // use 200 for update
            message: "Division deleted successfully",
            data: deleteDivision,
          });
        }
      );
      



export const divisionControllers={
    createDivision,
    getDivision,
    updateDivision,
    deleteDivision
}