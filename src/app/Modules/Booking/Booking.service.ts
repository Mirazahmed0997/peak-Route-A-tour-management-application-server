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
import { sslService } from "../SSLCommerce/sslCommerce.service";
import { ISSLCommerce } from "../SSLCommerce/Sslcommerce.interface";


const getTransactionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}



const createBooking = async (payload: Partial<Ibooking>, userId: string) => {


  const id = userId

  const tranSactionId = getTransactionId()


  const session = await Booking.startSession();
  session.startTransaction()

  try {

    const user = await User.findById(id)


    if (!user?.phone || !user?.address) {
      throw new AppError(httpStatus.BAD_REQUEST, "Please Update your Profile to book tour")
    }

    const tour = await Tour.findById(payload.tour).select("costFrom")

    if (!tour?.costFrom) {
      throw new AppError(httpStatus.BAD_REQUEST, " NO tour cost not found")
    }

    const amount = Number(tour.costFrom) * Number(payload.guestCount!)

    const booking =await Booking.create([{
      user: userId,
      status: BOOKING_STATUS.PENDING,
      ...payload,
    }],{session})


    const payment = await Payment.create([{
      booking:  booking[0]?._id,
      status: PAYMENT_STATUS.UNPAID,
      transactionId: tranSactionId,
      amount: amount
    }],{session})



    const updatedBooking = await Booking
      .findByIdAndUpdate(
        booking[0]?._id,
        { payment: payment[0]?._id},
        { new: true, runValidators: true,session })
        .populate("user", "name email phone address")
        .populate("tour", "title costFrom")
        .populate("payment")


        const userAddress  = (updatedBooking?.user as any).address 
        const userEmail  = (updatedBooking?.user as any).email 
        const userPhoneNumber = (updatedBooking?.user as any).phone 
        const userName = (updatedBooking?.user as any).name 

        const sslPayload : ISSLCommerce={
          address: userAddress,
          email:userEmail,
          phoneNumber: userPhoneNumber,
          name:userName,
          amount: amount,
          transactionId:tranSactionId
        }

        const sslPayment=await sslService.sslPaymentInit(sslPayload)

        await session.commitTransaction()
        session.endSession()

    return {
      booking: updatedBooking,
      paymentUrl:sslPayment.GatewayPageURL
    }

  } catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
  }




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






const getSingleBookings = async (id: string) => {

  console.log("booking Id", id)
  const booking = await Booking.findById(id);
  return {
    data: booking,
  }
}


const getUserBooking = async (userId: string) => {

  const booking = await Booking.find({user:userId});
  return {
    data: booking,
  }
}



const updateBooking = async (id: string, payload: Partial<Ibooking>) => {

  const isExist = await Booking.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  

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
  getUserBooking,
  getSingleBookings,
  updateBooking,
  deleteBooking
}