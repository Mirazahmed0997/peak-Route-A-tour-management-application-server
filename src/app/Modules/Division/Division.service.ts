import { deletImageFromCloudinary } from "../../Config/cloudunary.config";
import AppError from "../../errorHelper/AppError"
import { QueryBuilder } from "../../Utils/QueryBuilder";
import { searchFields } from "./Division.constant";
import { Idivision } from "./Division.interface"
import { Division } from "./Division.model"
import httpStatus from 'http-status-codes';





const createDivision = async (payload: Idivision) => {
  const isDivisionExist = await Division.findOne({name: payload.name })
  if (isDivisionExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Division  ALREADY EXIST")
  }

  const division = Division.create(payload)

  return division;
}


const getAllDivisions = async (query: Record<string, string>) => {
  
  const queryBuilder = new QueryBuilder(Division.find(), query)

  const divisions = await queryBuilder
    .search(searchFields)
    .filter()
    .fields()
    .paginate()
    .sort()

  const [data, meta] = await Promise.all([
    divisions.build(),
    queryBuilder.getMeta()
  ])

  return {
    data,
    meta
  }
}



const SingleDivision = async (slug: string) => {
  const division = await Division.findOne({slug})
  return {
    data: division,
  }
}



const updateDivision = async (id: string, payload: Partial<Idivision>) => {
  // Check if the division exists
  const isExist = await Division.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division not found");
  }

  const updatedDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true, 
    runValidators: true, 
  });

  if(payload.thumnail && isExist.thumnail)
  {
    await deletImageFromCloudinary(isExist.thumnail)
  }

  return updatedDivision;
};


const deleteDivision = async (id: string) => {
  // Check if the division exists
  const isExist = await Division.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division not found");
  }

  const deletedDivision = await Division.findByIdAndDelete(id)
  return deleteDivision
};





export const DivisionService = {
  createDivision,
  getAllDivisions,
  SingleDivision,
  updateDivision,
  deleteDivision
}