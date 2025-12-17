"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Payment_interface_1 = require("./Payment.interface");
const Payment_model_1 = require("./Payment.model");
const Booking_model_1 = require("../Booking/Booking.model");
const Booking_interface_1 = require("../Booking/Booking.interface");
const sslCommerce_service_1 = require("../SSLCommerce/sslCommerce.service");
const invoice_1 = require("../../Utils/invoice");
const sendEmail_1 = require("../../Utils/sendEmail");
const cloudunary_config_1 = require("../../Config/cloudunary.config");
const initPayment = async (bookingId) => {
    const payment = await Payment_model_1.Payment.findOne({ booking: bookingId });
    if (!payment) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Payment not found, you havenot booked any service");
    }
    const booking = await Booking_model_1.Booking.findById(payment.booking);
    const userAddress = (booking?.user).address;
    const userEmail = (booking?.user).email;
    const userPhoneNumber = (booking?.user).phone;
    const userName = (booking?.user).name;
    const sslPayload = {
        address: userAddress,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        name: userName,
        amount: payment.amount,
        transactionId: payment.transactionId
    };
    const sslPayment = await sslCommerce_service_1.sslService.sslPaymentInit(sslPayload);
    return {
        paymentUrl: sslPayment.GatewayPageURL
    };
};
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
const successPayment = async (query) => {
    // update booking status to confirm and paid
    const session = await Booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        // const booking= await Booking.findByIdAndUpdate()
        const updatedPayment = await Payment_model_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: Payment_interface_1.PAYMENT_STATUS.PAID,
        }, { new: true, runValidators: true, session: session });
        if (!updatedPayment) {
            throw new AppError_1.default(401, "Payment is not completed");
        }
        const upadatedBooking = await Booking_model_1.Booking
            .findByIdAndUpdate(updatedPayment?.booking._id, { status: Booking_interface_1.BOOKING_STATUS.COMPLETE }, { new: true, runValidators: true, session })
            .populate("tour", "title")
            .populate("user", "name email");
        if (!upadatedBooking) {
            throw new AppError_1.default(401, "Booking Not Found");
        }
        const invoiceData = {
            bookingDate: upadatedBooking?.createdAt,
            guestCount: upadatedBooking?.guestCount,
            transactionId: updatedPayment?.transactionId,
            tourTitle: (upadatedBooking?.tour).title,
            totalAmount: updatedPayment?.amount,
            userName: upadatedBooking.user.name
        };
        const pdfBuffer = await (0, invoice_1.generatePdf)(invoiceData);
        const cloudinaryResult = await (0, cloudunary_config_1.uploadBufferToCloudinary)(pdfBuffer, "invoice");
        if (!cloudinaryResult) {
            throw new AppError_1.default(401, "Error uplpading pdf");
        }
        await Payment_model_1.Payment.findByIdAndUpdate(updatedPayment._id, { invoiceUrl: cloudinaryResult.secure_url }, { runValidators: true, session });
        console.log(cloudinaryResult);
        await (0, sendEmail_1.sendEmail)({
            to: upadatedBooking.user.email,
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
        });
        await session.commitTransaction();
        session.endSession();
        return { success: true, message: "Payment completed successfully" };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const failPayment = async (query) => {
    console.log("failPayment triggered with query:", query);
    const session = await Booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        const updatedPayment = await Payment_model_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: Payment_interface_1.PAYMENT_STATUS.FAILED,
        }, { session });
        await Booking_model_1.Booking
            .findByIdAndUpdate(updatedPayment?.booking._id, { status: Booking_interface_1.BOOKING_STATUS.FAILED }, { new: true, runValidators: true, session });
        await session.commitTransaction();
        session.endSession();
        return { success: false, message: "Payment failed" };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getInvoiceDownloadUrl = async (paymentId) => {
    const payment = await Payment_model_1.Payment.findById(paymentId)
        .select("invoiceUrl")
        .orFail(new Error("Payment not found"));
    if (!payment.invoiceUrl) {
        throw new AppError_1.default(401, "Invoice not available yet");
    }
    return payment.invoiceUrl;
};
const cancelPayment = async (query) => {
    const session = await Booking_model_1.Booking.startSession();
    session.startTransaction();
    try {
        // const booking= await Booking.findByIdAndUpdate()
        const updatedPayment = await Payment_model_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: Payment_interface_1.PAYMENT_STATUS.CANCEL,
        }, { session });
        await Booking_model_1.Booking
            .findByIdAndUpdate(updatedPayment?.booking._id, { status: Booking_interface_1.BOOKING_STATUS.CANCEL }, { new: true, runValidators: true, session });
        await session.commitTransaction();
        session.endSession();
        return { success: false, message: "Payment canceled" };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.PaymentService = {
    successPayment,
    failPayment,
    cancelPayment,
    initPayment,
    getInvoiceDownloadUrl
};
//# sourceMappingURL=Payment.secvice.js.map