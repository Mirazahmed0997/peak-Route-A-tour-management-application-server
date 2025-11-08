import AppError from "../../errorHelper/AppError"
import { Idivision } from "./Division.interface"
import { Division } from "./Division.model"
import httpStatus  from 'http-status-codes';





const createDivision= async(payload:Partial<Idivision>)=>
{
    const {name,slug,...rest}=payload
    const isDivisionExist= await Division.findOne({name})
    if(isDivisionExist)
        {
            throw new AppError(httpStatus.BAD_REQUEST,"Division  ALREADY EXIST")
        }  

       

           const division=Division.create(
            {
                
                name,
                slug,
                ...rest
            }

        )

        return division;
}


const getAllDivisions=async ()=>
    {
        const divisions= await Division.find({})
        const totalDivision=await Division.countDocuments()
        return {
            data:divisions,
            meta:{
                total:totalDivision
            }
        }
    }



    const updateDivision = async (id: string, payload: Partial<Idivision>) => {
        // Check if the division exists
        const isExist = await Division.findById(id);
      
        if (!isExist) {
          throw new AppError(httpStatus.NOT_FOUND, "Division not found");
        }
      
        // Update division
        const updatedDivision = await Division.findByIdAndUpdate(id, payload, {
          new: true, // return the updated document
          runValidators: true, // run schema validators
        });
      
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





export const DivisionService={
    createDivision,
    getAllDivisions,
    updateDivision,
    deleteDivision
}