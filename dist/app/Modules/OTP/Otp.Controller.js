"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPcontroller = void 0;
const CatchAsync_1 = require("../../Utils/CatchAsync");
const sendResponse_1 = require("../../Utils/sendResponse");
const Otp_Service_1 = require("./Otp.Service");
const sentOtp = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const { email, name } = req.body;
    await Otp_Service_1.otpService.sendOTP(email, name);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "OTP Succesfully sent",
        data: null,
    });
});
const verifyOtp = (0, CatchAsync_1.catchAsynch)(async (req, res) => {
    const { email, otp } = req.body;
    await Otp_Service_1.otpService.veryfyOTP(email, otp);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "OTP verfied Succesfully",
        data: null,
    });
});
exports.OTPcontroller = {
    sentOtp,
    verifyOtp
};
//# sourceMappingURL=Otp.Controller.js.map