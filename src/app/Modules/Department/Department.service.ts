import { Query } from "mongoose";
import AppError from "../../errorHelper/AppError"
import { excludFields } from "../../globalConstants";
import httpStatus from 'http-status-codes';
import { QueryBuilder } from "../../Utils/QueryBuilder";
import { deletImageFromCloudinary } from "../../Config/cloudunary.config";
import { IDepartment } from "./Department.interface";
import { Department } from "./Department.model";
import { departmentSearchField } from "./Department.constant";



const createDepartment = async (payload: IDepartment) => {
    const { title } = payload
    const isExist = await Department.findOne({ title })
    if (isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Department ALREADY EXIST")
    }



    const department = Department.create(
        {

            title,
        }

    )

    return department;
}



const getAllDepartment = async (query: Record<string, string>) => {


    const queryBuilder = new QueryBuilder(Department.find(), query)
    
      const departments = await queryBuilder
        .search(departmentSearchField)
        .filter()
        .fields() 
        .paginate()
        .sort()
    
      const [data, meta] = await Promise.all([
        departments.build(),
        queryBuilder.getMeta()
      ])
    
      return {
        data,
        meta
      }
}


const getDepartmentById = async (id : string) => {

    const department = await Department.findOne({_id:id})
    return department
      

}



const updateDepartment = async (id: string, payload: Partial<ITourType>) => {
    // Check if the division exists
    const isExist = await TourType.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Tour Type not found");
    }

    // Update division
    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
        new: true, // return the updated document
        runValidators: true, // run schema validators
    });

    return updatedTourType;
};


const deleteTourType = async (id: string) => {
    // Check if the division exists
    const isExist = await TourType.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Tour Type not found");
    }

    const deleteTourType = await TourType.findByIdAndDelete(id)
    return deleteTourType
};


export const departmentService={
    createDepartment,
    getAllDepartment,
    getDepartmentById,
}