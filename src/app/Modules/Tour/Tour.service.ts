import AppError from "../../errorHelper/AppError"
import { ITour, ITourType } from "./Tour.interface"
import { Tour, TourType } from "./Tour.model"
import httpStatus  from 'http-status-codes';


// Tour Type Services

const createTourType= async(payload:Partial<ITourType>)=>
    {
        const {name}=payload
        const isTourTypeExist= await TourType.findOne({name})
        if(isTourTypeExist)
            {
                throw new AppError(httpStatus.BAD_REQUEST,"TOUR TYPE ALREADY EXIST")
            }  
    
           
    
               const tourType=TourType.create(
                {
                    
                    name,
                }
    
            )
    
            return tourType;
    }



    const getAllTourTypes=async ()=>
        {
            const tourType= await TourType.find({})
            const totalTourType=await TourType.countDocuments()
            return {
                data:tourType,
                meta:{
                    total:totalTourType
                }
            }
        }
    
    
    
        const updateTourType = async (id: string, payload: Partial<ITourType>) => {
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





    // Tour Services

    const createTour= async(payload:Partial<ITour>)=>
        {
            const {title,slug,...rest}=payload
            const isTourExist= await Tour.findOne({title})
            if(isTourExist)
                {
                    throw new AppError(httpStatus.BAD_REQUEST,"TOUR ALREADY EXIST")
                }  
        
               
        
                   const tour=Tour.create(
                    {
                        
                        title,
                        slug,
                        ...rest
                    }
        
                )
        
                return tour;
        }


    const getAllTour=async ()=>
            {
                const tour= await Tour.find({})
                const totalTour=await Tour.countDocuments()
                return {
                    data:tour,
                    meta:{
                        total:totalTour
                    }
                }
            }




    const updateTour = async (id: string, payload: Partial<ITour>) => {
                // Check if the division exists
                const isExist = await Tour.findById(id);
              
                if (!isExist) {
                  throw new AppError(httpStatus.NOT_FOUND, "Tour not found");
                }
              
                // Update division
                const updatedTour = await Tour.findByIdAndUpdate(id, payload, {
                  new: true, // return the updated document
                  runValidators: true, // run schema validators
                });
              
                return updatedTour;
              };
        
        
    const deleteTour = async (id: string) => {
                // Check if the division exists
                const isExist = await Tour.findById(id);
              
                if (!isExist) {
                  throw new AppError(httpStatus.NOT_FOUND, "Tour not found");
                }
              
                const deleteTour = await Tour.findByIdAndDelete(id)
                return deleteTour
              };






    export const TourTypeService={
        createTourType,
        getAllTourTypes,
        updateTourType,
        deleteTourType,
      
    }
    export const TourService={
        createTour,
        getAllTour,
        updateTour,
        deleteTour
      
    }