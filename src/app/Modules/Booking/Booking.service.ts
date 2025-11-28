import AppError from "../../errorHelper/AppError"
import { QueryBuilder } from "../../Utils/QueryBuilder";
import httpStatus from 'http-status-codes';
import { BOOKING_STATUS, Ibooking } from "./Booking.interface";
import { Booking } from "./Booking.model";
import { searchFields } from "./Booking.Constant";
import { User } from "../User/User.model";
import { PAYMENT_STATUS } from "../Payment/Payment.interface";
import { Payment } from "../Payment/Payment.model";
import { Tour } from "../Tour/Tour.model";


const getTransactionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random()* 1000) }`
}


const createBooking = async (payload: Partial<Ibooking>, userId: string) => {


  const id = userId
  
  const tranSactionId = getTransactionId()


  const user = await User.findById(id)


  if (!user?.phone || !user?.address) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please Update your Profile to book tour")
  }

  const tour = await Tour.findById(payload.tour).select("costFrom")

  if (!tour?.costFrom) {
    throw new AppError(httpStatus.BAD_REQUEST, " NO tour cost not found")
  }

  const amount = Number(tour.costFrom) * Number(payload.guestCount!)

  const booking = Booking.create({
    user: userId,
    status: BOOKING_STATUS.PENDING,
    ...payload,
  })


  const payment = await Payment.create({
    booking: (await booking)._id,
    status: PAYMENT_STATUS.UNPAID,
    transactionId: tranSactionId,
    amount: amount
  })



  const updatedBooking = await Booking
    .findByIdAndUpdate((await booking)._id,
      { payment: payment._id },
      { new: true, runValidators: true }).populate("user","name email phone address").populate("tour","title costFrom").populate("payment")
      


  return updatedBooking

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
const getUserBookings = async (query: Record<string, string>) => {

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



const getSingleBookings = async (id: string) => {

  console.log("booking Id", id)
  const booking = await Booking.findById(id);
  return {
    data: booking,
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
  getUserBookings,
  getSingleBookings,
  updateBooking,
  deleteBooking
}