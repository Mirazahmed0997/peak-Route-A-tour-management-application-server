import { Query } from "mongoose";
import AppError from "../../errorHelper/AppError"
import { excludFields } from "../../globalConstants";
import { searchFields, TourTypeSearchFields } from "./Tour.constant";
import { ITour, ITourType } from "./Tour.interface"
import { Tour, TourType } from "./Tour.model"
import httpStatus from 'http-status-codes';
import { QueryBuilder } from "../../Utils/QueryBuilder";
import { deletImageFromCloudinary } from "../../Config/cloudunary.config";


// Tour Type Services

const createTourType = async (payload: ITourType) => {
    const { name } = payload
    const isTourTypeExist = await TourType.findOne({ name })
    if (isTourTypeExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "TOUR TYPE ALREADY EXIST")
    }



    const tourType = TourType.create(
        {

            name,
        }

    )

    return tourType;
}



const getAllTourTypes = async (query: Record<string, string>) => {


    const queryBuilder = new QueryBuilder(TourType.find(), query)
    
      const tourTypes = await queryBuilder
        .search(TourTypeSearchFields)
        .filter()
        .fields() 
        .paginate()
        .sort()
    
      const [data, meta] = await Promise.all([
        tourTypes.build(),
        queryBuilder.getMeta()
      ])
    
      return {
        data,
        meta
      }
}


const getSingleTourType = async (id : string) => {
    const tourType = await TourType.findOne({_id:id})
    return tourType
      

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

const createTour = async (payload: ITour) => {


    const isTourExist = await Tour.findOne({ title: payload.title })
    if (isTourExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "TOUR ALREADY EXIST")
    }



    const tour = Tour.create(payload)

    return tour;
}






const getAllTour = async (query: Record<string, string>) => {

   
    const queryBuilder = new QueryBuilder(Tour.find(),query)

    const tours = await queryBuilder
                .search(searchFields)
                .filter()
                .fields()
                .paginate()
                .sort()

   

    const [data,meta]= await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])


    return {
        data,
        meta
    }
}



const getSingleTour = async (id: string) => {

   
    const singleTour =await Tour.findOne({_id:id})
    return singleTour
}



const updateTour = async (id: string, payload: Partial<ITour>) => {
    // Check if the division exists
    const isExist = await Tour.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Tour not found");
    }


    //  for include new images with older
    if(payload.images && payload.images.length && isExist.images && isExist.images.length)
    {
        payload.images=[...payload.images,...isExist.images]
    }

    // for delete selected images

    if(payload.deleteImages && payload.deleteImages.length && isExist.images && isExist.images.length)
    {
        const restDbImages= isExist.images.filter(imgUrl=>!payload.deleteImages?.includes(imgUrl))

        const updatedPayloadImages= (payload.images || [])
        .filter(imgUrl=>!payload.deleteImages?.includes(imgUrl))
        .filter(imgUrl=>!restDbImages?.includes(imgUrl))

        payload.images=[...restDbImages,...updatedPayloadImages]
    }



    // 

    const updatedTour = await Tour.findByIdAndUpdate(id, payload, {
        new: true, // return the updated document
        runValidators: true, // run schema validators
    });



    // for delete selected images

    if(payload.deleteImages && payload.deleteImages.length && isExist.images && isExist.images.length)
    {
        await Promise.all(payload.deleteImages.map(url=>deletImageFromCloudinary(url)))
    }


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






export const TourTypeService = {
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType,
    getSingleTourType

}
export const TourService = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
    getSingleTour

}