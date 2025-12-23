"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const env_1 = require("../Config/env");
const User_model_1 = require("../Modules/User/User.model");
const User_interface_1 = require("../Modules/User/User.interface");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const verifyAuth = (...authRoles) => async (req, res, next) => {
    try {
        const accesToken = req.headers.authorization || req.cookies.accessToken;
        if (!accesToken) {
            throw new AppError_1.default(403, "No token recieved");
        }
        const verifyToken = jsonwebtoken_1.default.verify(accesToken, env_1.envVars.jwt_access_secret);
        const isUserExist = await User_model_1.User.findOne({ email: verifyToken.email });
        console.log("from check auth", isUserExist);
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
        if (!authRoles.includes(verifyToken.role)) {
            throw new AppError_1.default(403, "Permission Denied");
        }
        req.user = verifyToken;
        console.log(verifyToken);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.verifyAuth = verifyAuth;
//# sourceMappingURL=CheckAuth.js.map