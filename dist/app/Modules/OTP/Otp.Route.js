"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRouter = void 0;
const express_1 = __importDefault(require("express"));
const Otp_Controller_1 = require("./Otp.Controller");
const router = express_1.default.Router();
router.post('/send', Otp_Controller_1.OTPcontroller.sentOtp);
router.post('/verify', Otp_Controller_1.OTPcontroller.verifyOtp);
exports.otpRouter = router;
//# sourceMappingURL=Otp.Route.js.map