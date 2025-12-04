

import { NextFunction, Request, Response } from "express"
import { catchAsynch } from "../../Utils/CatchAsync"
import { sendResponse } from "../../Utils/sendResponse"
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelper/AppError";
import { departmentService } from "./Department.service";





const createDepartment = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const department = await departmentService.createDepartment(req.body)


  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Department Create successfully",
    data: department,
  })
})




const getAllDepartment = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const query=req.query

  console.log(query)
  const departments = await TourTypeService.getAllTourTypes(query as Record<string, string>)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Get all departments successfully",
    data: departments,
  })
})





const getDepartmentById = catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  console.log(id)
  const department = await TourTypeService.getSingleTourType(id as string)


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Get specific department successfully",
    data: department,
  })
})

const updateDepartment = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; 
    const payload = req.body;  

    const updatedDepartment = await TourTypeService.updateTourType(id as string, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK, 
      message: "Department updated successfully",
      data: updatedDepartment,
    });
  }
);

const deleteDepartment = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // ✅ get division ID from URL

    const deletedDepartment = await TourTypeService.deleteTourType(id as string);

    // ✅ send proper response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK, // use 200 for update
      message: "Department deleted successfully",
      data: deletedDepartment,
    });
  }
);


export const departmentController={
    createDepartment,
    getAllDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
}