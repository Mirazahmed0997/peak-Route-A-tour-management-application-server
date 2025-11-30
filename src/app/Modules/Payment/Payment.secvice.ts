import AppError from "../../errorHelper/AppError"
import { QueryBuilder } from "../../Utils/QueryBuilder";
import httpStatus from 'http-status-codes';
import { IPayment, PAYMENT_STATUS } from "./Payment.interface";
import { Payment } from "./Payment.model";
import { searchFields } from "./Payment.Constant";
import { Booking } from "../Booking/Booking.model";
import { BOOKING_STATUS } from "../Booking/Booking.interface";
import { success } from "zod";
import { error } from "console";
import { ISSLCommerce } from "../SSLCommerce/Sslcommerce.interface";
import { sslService } from "../SSLCommerce/sslCommerce.service";






const initPayment = async (bookingId: string) => {

  

  const payment= await Payment.findOne({booking:bookingId})

  if(!payment)
  {
    throw new  AppError(httpStatus.NOT_FOUND,"Payment not found, you havenot booked any service")
  }

  const booking= await Booking.findById(payment.booking)


          const userAddress  = (booking?.user as any).address 
          const userEmail  = (booking?.user as any).email 
          const userPhoneNumber = (booking?.user as any).phone 
          const userName = (booking?.user as any).name 
  
          const sslPayload : ISSLCommerce={
            address: userAddress,
            email:userEmail,
            phoneNumber: userPhoneNumber,
            name:userName,
            amount: payment.amount,
            transactionId:payment.transactionId
          }
  
          const sslPayment=await sslService.sslPaymentInit(sslPayload)


          return{
           paymentUrl:sslPayment.GatewayPageURL
          }

}




const successPayment = async (query: Record<string, string>) => {

  // update booking status to confirm and paid
  const session = await Booking.startSession();
  session.startTransaction()

  try {
    // const booking= await Booking.findByIdAndUpdate()
    const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
      status: PAYMENT_STATUS.PAID,
    }, { session })


    await Booking
      .findByIdAndUpdate(
        updatedPayment?.booking._id,
        { status: BOOKING_STATUS.COMPLETE },
        { new: true, runValidators: true, session })



    await session.commitTransaction()
    session.endSession()

    return { success: true, message: "Payment completed successfully" }


  } catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
  }
}



const failPayment = async (query: Record<string, string>) => {

console.log("failPayment triggered with query:", query);

  const session = await Booking.startSession();
  session.startTransaction()

  try {
    const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
      status: PAYMENT_STATUS.FAILED,
    }, { session })


    await Booking
      .findByIdAndUpdate(
        updatedPayment?.booking._id,
        { status: BOOKING_STATUS.FAILED },
        {new:true, runValidators: true, session })



    await session.commitTransaction()
    session.endSession()

    return { success: false, message: "Payment failed" }


  } catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
  }
}



const cancelPayment = async (query: Record<string, string>) => {

  const session = await Booking.startSession();
  session.startTransaction()

  try {
    // const booking= await Booking.findByIdAndUpdate()
    const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
      status: PAYMENT_STATUS.CANCEL,
    }, { session })


    await Booking
      .findByIdAndUpdate(
        updatedPayment?.booking._id,
        { status: BOOKING_STATUS.CANCEL },
        {new:true, runValidators: true, session })



    await session.commitTransaction()
    session.endSession()

    return { success: false, message: "Payment canceled" }


  } catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
  }
}








export const PaymentService = {
  successPayment,
  failPayment,
  cancelPayment,
  initPayment
}