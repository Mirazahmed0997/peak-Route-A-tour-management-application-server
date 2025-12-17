"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const CatchAsync_1 = require("../../Utils/CatchAsync");
const sendResponse_1 = require("../../Utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Payment_secvice_1 = require("./Payment.secvice");
const env_1 = require("../../Config/env");
const sslCommerce_service_1 = require("../SSLCommerce/sslCommerce.service");
const initPayment = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const bookingId = req.params.bookingId;
    console.log("bookingId", bookingId);
    const result = await Payment_secvice_1.PaymentService.initPayment(bookingId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Payment Create successfully",
        data: result,
    });
});
const successPayment = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const query = req.query;
    const result = await Payment_secvice_1.PaymentService.successPayment(query);
    if (result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const getInvoiceDownloadUrl = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const { paymentId } = req.params;
    const result = await Payment_secvice_1.PaymentService.getInvoiceDownloadUrl(paymentId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Invoice Download URL retrived succesfully",
        data: result,
    });
});
const validatePayment = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const result = await sslCommerce_service_1.sslService.validatePayment(req.body);
    console.log("ssl body", req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Payment validated succesfully",
        data: result,
    });
});
const failPayment = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const query = req.query;
    const result = await Payment_secvice_1.PaymentService.failPayment(query);
    console.log("failed", result);
    if (!result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const cancelPayment = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const query = req.query;
    const result = await Payment_secvice_1.PaymentService.cancelPayment(query);
    if (!result.success) {
        res.redirect(`${env_1.envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
exports.PaymentController = {
    successPayment,
    failPayment,
    cancelPayment,
    initPayment,
    getInvoiceDownloadUrl,
    validatePayment
};
//# sourceMappingURL=Payment.controller.js.map