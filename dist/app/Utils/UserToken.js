"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewAccessTokenWithrefreshToken = exports.createUserTokrens = void 0;
const env_1 = require("../Config/env");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const User_interface_1 = require("../Modules/User/User.interface");
const User_model_1 = require("../Modules/User/User.model");
const jwt_1 = require("./jwt");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUserTokrens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.jwt_access_secret, env_1.envVars.jwt_access_expire);
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.JWT_REFRESH_SECRET, env_1.envVars.JWT_EXPIRE_SECRET);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserTokrens = createUserTokrens;
const createNewAccessTokenWithrefreshToken = async (refreshToken) => {
    const verifyRefreshToken = (0, jwt_1.verifyToken)(refreshToken, env_1.envVars.JWT_REFRESH_SECRET);
    const isUserExist = await User_model_1.User.findOne({ email: verifyRefreshToken.email });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  DOES NOT EXIST");
    }
    if (isUserExist.isActive === User_interface_1.isActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is blocked");
    }
    if (isUserExist.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is deleted");
    }
    if (isUserExist.isActive === User_interface_1.isActive.INACTIVE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is inactive");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    };
    const accesToken = (0, jwt_1.generateToken)(jwtPayload, env_1.envVars.jwt_access_secret, env_1.envVars.jwt_access_expire);
    return {
        accesToken
    };
};
exports.createNewAccessTokenWithrefreshToken = createNewAccessTokenWithrefreshToken;
//# sourceMappingURL=UserToken.js.map