"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const Booking_interface_1 = require("./Booking.interface");
const bookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose_1.Schema.Types.ObjectId, ref: "Tour", required: true },
    payment: { type: mongoose_1.Schema.Types.ObjectId, ref: "Payment", required: false },
    status: { type: String, enum: Object.values(Booking_interface_1.BOOKING_STATUS), default: Booking_interface_1.BOOKING_STATUS.PENDING },
    guestCount: { type: Number, required: true }
}, {
    timestamps: true
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
//# sourceMappingURL=Booking.model.js.map