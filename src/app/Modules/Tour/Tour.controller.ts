import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { TourService, TourTypeService } from "./Tour.service"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from 'http-status-codes';
import { ITour } from "./Tour.interface";
import AppError from "../../errorHelper/AppError";





const createTourType = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const tourType = await TourTypeService.createTourType(req.body)


  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Tour Type Create successfully",
    data: tourType,
  })
})




const getAllTourTypes = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const query=req.query
  console.log(query)
  const tourTypes = await TourTypeService.getAllTourTypes(query as Record<string, string>)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Get all Tour Types successfully",
    data: tourTypes,
  })
})





const getSingleTourType = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  console.log(id)
  const tours = await TourTypeService.getSingleTourType(id as string)


  // res.status(httpStatus.CREATED).json({
  //     message: "User successfully created"
  // })
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Get all Tour successfully",
    data: tours,
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



// Tour Controllers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const createTour = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {



  req.body=JSON.parse(req.body.data);

  console.log({
      body:req.body,
      files:req.files
    })

  const payload:ITour={
    ...req.body,
    images: (req.files as Express.Multer.File[])?.map(file=> file.path)
  }
       
  const tour = await TourService.createTour(payload)


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Tour Create successfully",
    data: tour,
  })
})




const getAllTour = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query
  const tours = await TourService.getAllTour(query as Record<string, string>)

  sendResponse(res, {
    success: true,
      statusCode: httpStatus.OK,
    message: "Get all Tour successfully",
    data: tours,
  })
})



const getSingleTour = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  
  const id = req.params.id
  console.log("id",id)
  const tour = await TourService.getSingleTour(id as string)


  
  sendResponse(res, {
    success: true,
      statusCode: httpStatus.OK,
    message: "Get Tour successfully",
    data: tour,
  })
})



const updateTour = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // ✅ get division ID from URL
    const payload = req.body;  // ✅ get update data from request body

    // ✅ call service with both id and payload
    const updatedTour = await TourService.updateTour(id as string, payload);

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



export const TourTypeControllers = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  getSingleTourType

}

export const TourControllers = {
  createTour,
  getAllTour,
  updateTour,
  deleteTour,
  getSingleTour
}