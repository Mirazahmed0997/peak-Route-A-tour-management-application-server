"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const Payment_interface_1 = require("./Payment.interface");
const paymentSchema = new mongoose_1.Schema({
    booking: { type: mongoose_1.Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    paymentGatewayData: { type: mongoose_1.Schema.Types.Mixed },
    invoiceUrl: { type: String },
    status: { type: String, enum: Object.values(Payment_interface_1.PAYMENT_STATUS), default: Payment_interface_1.PAYMENT_STATUS.UNPAID },
}, {
    timestamps: true
});
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
//# sourceMappingURL=Payment.model.js.map