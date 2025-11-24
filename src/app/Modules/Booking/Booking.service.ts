import AppError from "../../errorHelper/AppError"
import { QueryBuilder } from "../../Utils/QueryBuilder";
import httpStatus from 'http-status-codes';
import { Ibooking } from "./Booking.interface";
import { Booking } from "./Booking.model";
import { searchFields } from "./Booking.Constant";





const createBooking = async (payload: Ibooking,bookingID:string) => {


const id=bookingID

  const isBookingExist = await Booking.findOne({id})
  if (isBookingExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "BOOKING  ALREADY EXIST")
  }
  const booking = Booking.create(payload)
  return booking;
}


const getAllBookings = async (query: Record<string, string>) => {
  
  const queryBuilder = new QueryBuilder(Booking.find(), query)

  const bookings = await queryBuilder
    .search(searchFields)
    .filter()
    .fields()
    .paginate()
    .sort()

  const [data, meta] = await Promise.all([
    bookings.build(),
    queryBuilder.getMeta()
  ])

  return {
    data,
    meta
  }
}



const getSingleBookings = async (slug: string) => {
    
  const division = await Booking.findOne({slug})
  return {
    data: division,
  }
}



const updateBooking = async (id: string, payload: Partial<Ibooking>) => {

  const isExist = await Booking.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  // const duplicateBooking = await Booking.findOne({
  //   name: payload.name,
  //   _id: { $ne: id }
  // })

  // if (duplicateDivision) {
  //   throw new Error("A division with this name is already exists")
  // }

  // if (payload.name) {
  //   const baseSlug = payload.name.toLowerCase().split(" ").join("-")
  //   let slug = `${baseSlug}-division`
  //   console.log("slug", slug)

  //   let counter = 0
  //   while (await Division.exists({ slug })) {
  //     slug = `${slug}-${counter++}`
  //   }
  //   payload.slug = slug
  // }

  // Update division
  
  const updatedBookings = await Booking.findByIdAndUpdate(id, payload, {
    new: true, 
    runValidators: true,
  });

  return updatedBookings;
};


const deleteBooking = async (id: string) => {
  const isExist = await Booking.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const deletedBooking = await Booking.findByIdAndDelete(id)
  return deletedBooking
};





export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBookings,
  updateBooking,
  deleteBooking
}