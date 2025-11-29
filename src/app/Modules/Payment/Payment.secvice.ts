import AppError from "../../errorHelper/AppError"
import { QueryBuilder } from "../../Utils/QueryBuilder";
import httpStatus from 'http-status-codes';
import { IPayment, PAYMENT_STATUS } from "./Payment.interface";
import { Payment } from "./Payment.model";
import { searchFields } from "./Payment.Constant";
import { Booking } from "../Booking/Booking.model";
import { BOOKING_STATUS } from "../Booking/Booking.interface";
import { success } from "zod";






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
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment")


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

  // update booking status to confirm and paid


  const queryBuilder = new QueryBuilder(Payment.find(), query)

  const payments = await queryBuilder
    .search(searchFields)
    .filter()
    .fields()
    .paginate()
    .sort()

  const [data, meta] = await Promise.all([
    payments.build(),
    queryBuilder.getMeta()
  ])

  return {
    data,
    meta
  }
}



const cancelPayment = async (id: string) => {

  // update booking status to confirm and paid


  const payment = await Payment.findOne({ id })
  return {
    data: payment,
  }
}








export const PaymentService = {
  successPayment,
  failPayment,
  cancelPayment,
}