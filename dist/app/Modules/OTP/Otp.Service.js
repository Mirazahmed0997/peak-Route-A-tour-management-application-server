"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const redis_config_1 = require("../../Config/redis.config");
const sendEmail_1 = require("../../Utils/sendEmail");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const User_model_1 = require("../User/User.model");
const OTP_EXPIRATION = 2 * 60;
const generateOTP = async (length = 6) => {
    const otp = crypto_1.default.randomInt(10 ** (length - 1), 10 ** length).toString();
    return otp;
};
const sendOTP = async (email) => {
    const user = await User_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (user.isVerified) {
        throw new AppError_1.default(401, `${email} is Already Veryfied`);
    }
    const otp = await generateOTP();
    const redisKey = `otp:${email}`;
    await redis_config_1.redisClient.set(redisKey, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION
        }
    });
    await (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "Your OTP Code",
        templateName: "otpTmeplate",
        templateData: {
            otp: otp
        }
    });
};
const veryfyOTP = async (email, otp) => {
    const user = await User_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (user.isVerified) {
        throw new AppError_1.default(401, `${email} is Already Veryfied`);
    }
    const redisKey = `otp:${email}`;
    const savedOtp = await redis_config_1.redisClient.get(redisKey);
    if (!savedOtp) {
        throw new AppError_1.default(401, "invalid OTP");
    }
    if (savedOtp !== otp) {
        throw new AppError_1.default(401, "invalid OTP");
    }
    await Promise.all([
        User_model_1.User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redis_config_1.redisClient.del([redisKey])
    ]);
    return {};
};
exports.otpService = {
    sendOTP,
    veryfyOTP
};
//# sourceMappingURL=Otp.Service.js.map