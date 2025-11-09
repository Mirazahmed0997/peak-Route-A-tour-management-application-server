import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { TourService, TourTypeService } from "./Tour.service"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus  from 'http-status-codes';





const createTourType= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
    {
        const tourType = await TourTypeService.createTourType(req.body)
          
    
            // res.status(httpStatus.CREATED).json({
            //     message: "User successfully created"
            // })
            sendResponse(res,{
                success:true,
                statusCode:httpStatus.CREATED,
                message:"Tour Type Create successfully",
                data:tourType,
            })
    })




    const getAllTourTypes= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
        {
            const tourTypes = await TourTypeService.getAllTourTypes()
              
        
                // res.status(httpStatus.CREATED).json({
                //     message: "User successfully created"
                // })
                sendResponse(res,{
                    success:true,
                    statusCode:httpStatus.CREATED,
                    message:"Get all Tour Types successfully",
                    data:tourTypes,
                })
        })
    
    
        const updateTourType = catchAsynch(
            async (req: Request, res: Response, next: NextFunction) => {
              const { id } = req.params; // ✅ get division ID from URL
              const payload = req.body;  // ✅ get update data from request body
          
              // ✅ call service with both id and payload
              const updatedTourType = await TourTypeService.updateTourType(id as string, payload);
          
              // ✅ send proper response
              sendResponse(res, {
                success: true,
                statusCode: httpStatus.OK, // use 200 for update
                message: "Tour Type updated successfully",
                data: updatedTourType,
              });
            }
          );
    
        const deleteTourType = catchAsynch(
            async (req: Request, res: Response, next: NextFunction) => {
              const { id } = req.params; // ✅ get division ID from URL
          
              const deletedTourType = await TourTypeService.deleteTourType(id as string);
          
              // ✅ send proper response
              sendResponse(res, {
                success: true,
                statusCode: httpStatus.OK, // use 200 for update
                message: "Tour Type deleted successfully",
                data: deletedTourType,
              });
            }
          );



    // Tour Controllers

    const createTour= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
        {
            const tour= await TourService.createTour(req.body)
              
        
                // res.status(httpStatus.CREATED).json({
                //     message: "User successfully created"
                // })
                sendResponse(res,{
                    success:true,
                    statusCode:httpStatus.CREATED,
                    message:"Tour Create successfully",
                    data:tour,
                })
        })
    
    
    
    
        const getAllTour= catchAsynch( async (req:Request,res:Response,next:NextFunction)=>
            {
                const tours = await TourService.getAllTour()
                  
            
                    // res.status(httpStatus.CREATED).json({
                    //     message: "User successfully created"
                    // })
                    sendResponse(res,{
                        success:true,
                        statusCode:httpStatus.CREATED,
                        message:"Get all Tour successfully",
                        data:tours,
                    })
            })
        
        
            const updateTour= catchAsynch(
                async (req: Request, res: Response, next: NextFunction) => {
                  const { id } = req.params; // ✅ get division ID from URL
                  const payload = req.body;  // ✅ get update data from request body
              
                  // ✅ call service with both id and payload
                  const updatedTour= await TourService.updateTour(id as string, payload);
              
                  // ✅ send proper response
                  sendResponse(res, {
                    success: true,
                    statusCode: httpStatus.OK, // use 200 for update
                    message: "Tour updated successfully",
                    data: updatedTour,
                  });
                }
              );
        
            const deleteTour = catchAsynch(
                async (req: Request, res: Response, next: NextFunction) => {
                  const { id } = req.params; // ✅ get division ID from URL
              
                  const deletedTour = await TourService.deleteTour(id as string);
              
                  // ✅ send proper response
                  sendResponse(res, {
                    success: true,
                    statusCode: httpStatus.OK, // use 200 for update
                    message: "Tour deleted successfully",
                    data: deletedTour,
                  });
                }
              );



    export const TourTypeControllers={
        createTourType,
        getAllTourTypes,
        updateTourType,
        deleteTourType
        
    }

    export const TourControllers={
        createTour,
        getAllTour,
        updateTour,
        deleteTour
        
    }