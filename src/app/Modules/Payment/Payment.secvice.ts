import AppError from "../../errorHelper/AppError"
import { QueryBuilder } from "../../Utils/QueryBuilder";
import httpStatus from 'http-status-codes';
import { IPayment } from "./Payment.interface";
import { Payment } from "./Payment.model";
import { searchFields } from "./Payment.Constant";






const createPayment = async (payload: IPayment,paymentID:string) => {


const id=paymentID

  const isExist = await Payment.findOne({id})
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "PAYMENT  ALREADY EXIST")
  }
  const payment = Payment.create(payload)
  return payment;
}


const getAllPayments = async (query: Record<string, string>) => {
  
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



const getSinglePayments = async (id: string) => {
    
  const payment = await Payment.findOne({id})
  return {
    data: payment,
  }
}



// const updateBooking = async (id: string, payload: Partial<Ibooking>) => {

//   const isExist = await Payment.findById(id);

//   if (!isExist) {
//     throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
//   }

  
//   const updatedBookings = await Booking.findByIdAndUpdate(id, payload, {
//     new: true, 
//     runValidators: true,
//   });

//   return updatedBookings;
// };


const deletePayment = async (id: string) => {
  const isExist = await Payment.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found");
  }

  const deletedPayment = await Payment.findByIdAndDelete(id)
  return deletedPayment
};





export const PaymentService = {
  createPayment,
  getAllPayments,
  getSinglePayments,
  deletePayment
}