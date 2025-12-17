import AppError from "../../errorHelper/AppError"
import httpStatus from 'http-status-codes';
import {  PAYMENT_STATUS } from "./Payment.interface";
import { Payment } from "./Payment.model";
import { Booking } from "../Booking/Booking.model";
import { BOOKING_STATUS } from "../Booking/Booking.interface";
import { ISSLCommerce } from "../SSLCommerce/Sslcommerce.interface";
import { sslService } from "../SSLCommerce/sslCommerce.service";
import { generatePdf, InvoiceData } from "../../Utils/invoice";
import { ITour } from "../Tour/Tour.interface";
import { Iuser } from "../User/User.interface";
import { sendEmail } from "../../Utils/sendEmail";
import { uploadBufferToCloudinary } from "../../Config/cloudunary.config";






const initPayment = async (bookingId: string) => {



  const payment = await Payment.findOne({ booking: bookingId })

  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, "Payment not found, you havenot booked any service")
  }

  const booking = await Booking.findById(payment.booking)


  const userAddress = (booking?.user as any).address
  const userEmail = (booking?.user as any).email
  const userPhoneNumber = (booking?.user as any).phone
  const userName = (booking?.user as any).name

  const sslPayload: ISSLCommerce = {
    address: userAddress,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    name: userName,
    amount: payment.amount,
    transactionId: payment.transactionId
  }

  const sslPayment = await sslService.sslPaymentInit(sslPayload)


  return {
    paymentUrl: sslPayment.GatewayPageURL
  }

}

// const successPayment = async (query: Record<string, string>) => {
//   const session = await Booking.startSession();
//   session.startTransaction();

//   try {
//     // 1️⃣ Update payment
//     const updatedPayment = await Payment.findOneAndUpdate(
//       { transactionId: query.transactionId },
//       { status: PAYMENT_STATUS.PAID },
//       { new: true, session }
//     );

//     if (!updatedPayment) {
//       throw new AppError(401, "Payment is not completed");
//     }

//     // 2️⃣ Update booking
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       updatedPayment.booking,
//       { status: BOOKING_STATUS.COMPLETE },
//       { new: true, runValidators: true, session }
//     )
//       .populate({ path: "tour", select: "title" })
//       .populate({ path: "user", select: "name email" });

//     if (!updatedBooking) {
//       throw new AppError(404, "Booking Not Found");
//     }

//     // 3️⃣ Prepare invoice
//     const invoiceData: InvoiceData = {
//       bookingDate: updatedBooking.createdAt,
//       guestCount: updatedBooking.guestCount,
//       transactionId: updatedPayment.transactionId,
//       tourTitle: (updatedBooking.tour as ITour).title,
//       totalAmount: updatedPayment.amount,
//       userName: (updatedBooking.user as Iuser).name,
//     };

//     const pdfBuffer = await generatePdf(invoiceData);

//     await sendEmail({
//       to: (updatedBooking.user as Iuser).email,
//       subject: "Booking Invoice",
//       templateName: "invoice",
//       templateData: invoiceData,
//       attachments: [
//         {
//           filename: "invoice.pdf",
//           content: pdfBuffer,
//           contentType: "application/pdf",
//         },
//       ],
//     });

//     await session.commitTransaction();
//     session.endSession();

//     return { success: true, message: "Payment completed successfully" };

//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };



const successPayment = async (query: Record<string, string>) => {

  // update booking status to confirm and paid
  const session = await Booking.startSession();
  session.startTransaction()

  try {
    // const booking= await Booking.findByIdAndUpdate()
    const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
      status: PAYMENT_STATUS.PAID,
    }, { new: true, runValidators: true, session: session })

    if (!updatedPayment) {
      throw new AppError(401, "Payment is not completed")
    }


    const upadatedBooking = await Booking
      .findByIdAndUpdate(
        updatedPayment?.booking._id,
        { status: BOOKING_STATUS.COMPLETE },
        { new: true, runValidators: true, session })
      .populate("tour", "title")
      .populate("user", "name email")

    if (!upadatedBooking) {
      throw new AppError(401, "Booking Not Found")
    }


    const invoiceData: InvoiceData = {
      bookingDate: upadatedBooking?.createdAt as Date,
      guestCount: upadatedBooking?.guestCount,
      transactionId: updatedPayment?.transactionId,
      tourTitle: (upadatedBooking?.tour as unknown as ITour).title,
      totalAmount: updatedPayment?.amount,
      userName: (upadatedBooking.user as unknown as Iuser).name

    }

    const pdfBuffer = await generatePdf(invoiceData)

    const cloudinaryResult :any= await uploadBufferToCloudinary(pdfBuffer, "invoice")

    if(!cloudinaryResult)
    {
      throw new AppError(401,"Error uplpading pdf")
    }

    await Payment.findByIdAndUpdate(updatedPayment._id, { invoiceUrl: cloudinaryResult.secure_url },{runValidators:true,session})

    console.log(cloudinaryResult)


    await sendEmail({
      to: (upadatedBooking.user as unknown as Iuser).email,
      subject: "Booking Invoice",
      templateName: "invoice",
      templateData: invoiceData,
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]

    })



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
        { new: true, runValidators: true, session })



    await session.commitTransaction()
    session.endSession()

    return { success: false, message: "Payment failed" }


  } catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
  }
}

const getInvoiceDownloadUrl = async (paymentId: string) => {

  const payment = await Payment.findById(paymentId)
                  .select("invoiceUrl")
                  .orFail(new Error("Payment not found"));

  if(!payment.invoiceUrl){
    throw new AppError(401,"Invoice not available yet")
  }              

  return payment.invoiceUrl
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
        { new: true, runValidators: true, session })



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
  initPayment,
  getInvoiceDownloadUrl
}