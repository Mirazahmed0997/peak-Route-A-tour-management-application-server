"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoute = void 0;
const express_1 = require("express");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const Payment_controller_1 = require("./Payment.controller");
const router = (0, express_1.Router)();
router.post('/init-payment/:bookingId', Payment_controller_1.PaymentController.initPayment);
router.post('/success', Payment_controller_1.PaymentController.successPayment);
router.post('/fail', Payment_controller_1.PaymentController.failPayment);
router.post('/cancel', Payment_controller_1.PaymentController.cancelPayment);
router.get('/invoice/:paymentId', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), Payment_controller_1.PaymentController.getInvoiceDownloadUrl);
router.post('/validate-payment', Payment_controller_1.PaymentController.validatePayment);
exports.PaymentRoute = router;
//# sourceMappingURL=Payment.route.js.map