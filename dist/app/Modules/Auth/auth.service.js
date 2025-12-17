"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const User_interface_1 = require("../User/User.interface");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const User_model_1 = require("../User/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../Config/env");
const UserToken_1 = require("../../Utils/UserToken");
const sendEmail_1 = require("../../Utils/sendEmail");
// const credentialsLogin=async(payload:Partial<Iuser>)=>{
//     const {email,password}=payload
//     const isUserExist= await User.findOne({email})
//         if(!isUserExist)
//             {
//                 throw new AppError(httpStatus.BAD_REQUEST,"USER  DOES NOT EXIST")
//             } 
//         const isPassordMatched=await bcryptjs.compare(password as string,isUserExist.password as string)
//         if(!isPassordMatched)
//         {
//             throw new AppError(httpStatus.BAD_REQUEST,"Password Incorrect")
//         }
//     const userTokens= createUserTokrens(isUserExist)
//     const {password:pass,...rest}=isUserExist.toObject()
//         return{
//             accessToken: userTokens.accesToken,
//             refreshToken: userTokens.refreshToken,
//             user:rest
//         }
// }
const getNewAccessToken = async (refreshToken) => {
    const newAccessToken = await (0, UserToken_1.createNewAccessTokenWithrefreshToken)(refreshToken);
    console.log(newAccessToken);
    return {
        accessToken: newAccessToken
    };
};
const resetPassword = async (newPassword, id, decodedToken) => {
    if (id !== decodedToken.userId) {
        throw new AppError_1.default(401, "you cannot reset your password");
    }
    const isUserExist = await User_model_1.User.findById(decodedToken.userId);
    if (!isUserExist) {
        throw new AppError_1.default(401, "User does not exist");
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    isUserExist.password = hashedPassword;
    await isUserExist.save();
};
const setPassword = async (userId, plainPassword) => {
    const user = await User_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (user.password && user.auths.some(providerObject => providerObject.provider == "google")) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You have already set your password now ypu can change your password from profile");
    }
    const hashedPassword = await bcryptjs_1.default.hash(plainPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const credintialProvider = {
        provider: "credentials",
        providerId: user.email
    };
    const auths = [...user.auths, credintialProvider];
    user.password = hashedPassword;
    user.auths = auths;
    await user.save();
};
const forgotPassword = async (email) => {
    const isUserExist = await User_model_1.User.findOne({ email });
    if (isUserExist?.isActive === User_interface_1.isActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is blocked");
    }
    if (isUserExist?.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is deleted");
    }
    if (!isUserExist?.isVerified) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is not verified");
    }
    if (isUserExist?.isActive === User_interface_1.isActive.INACTIVE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is inactive");
    }
    const JwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };
    const resetToken = jsonwebtoken_1.default.sign(JwtPayload, env_1.envVars.jwt_access_secret, {
        expiresIn: "10m"
    });
    const resetUILink = `${env_1.envVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)({
        to: isUserExist.email,
        subject: "Password Reset",
        templateName: "forgetPassword",
        templateData: {
            name: isUserExist.name,
            resetUILink
        }
    });
};
const changePassword = async (oldPassword, newPassword, decodedToken) => {
    const user = await User_model_1.User.findById(decodedToken.userId);
    const isOldPasswordMatched = await bcryptjs_1.default.compare(oldPassword, user?.password);
    if (!isOldPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Password not mathched");
    }
    user.password = await bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    user?.save();
    return true;
};
exports.authServices = {
    getNewAccessToken,
    resetPassword,
    changePassword,
    setPassword,
    forgotPassword
};
//# sourceMappingURL=auth.service.js.map