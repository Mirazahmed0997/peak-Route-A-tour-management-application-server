"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const CatchAsync_1 = require("../../Utils/CatchAsync");
const sendResponse_1 = require("../../Utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const auth_service_1 = require("./auth.service");
const setCookie_1 = require("../../Utils/setCookie");
const UserToken_1 = require("./../../Utils/UserToken");
const env_1 = require("../../Config/env");
const passport_1 = __importDefault(require("passport"));
const credentialsLogin = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    // const logInInfo= await authServices.credentialsLogin(req.body)
    passport_1.default.authenticate("local", async (err, user, info) => {
        if (err) {
            return next(new AppError_1.default(err.statusCode || 401, err.message));
        }
        if (!user) {
            return next(new AppError_1.default(401, info.message));
        }
        const userTokens = (0, UserToken_1.createUserTokrens)(user);
        // delete user.toObject().password
        const { password: pass, ...rest } = user.toObject();
        (0, setCookie_1.setAuthCookies)(res, userTokens);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "User Login successfully",
            data: {
                accessToken: userTokens.accesToken,
                refreshToken: userTokens.refreshToken,
                user: rest
            },
        });
    })(req, res, next);
});
const getNewAccessToken = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No refresh Token");
    }
    const tokenInfo = await auth_service_1.authServices.getNewAccessToken(refreshToken);
    // to set new acces token in cookies
    // setAuthCookies(res,tokenInfo) 
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Successfully get new access token",
        data: tokenInfo,
    });
});
const logOut = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User Logged out successfully",
        data: null,
    });
});
const changePassword = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    await auth_service_1.authServices.changePassword(oldPassword, newPassword, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password changed successfully",
        data: null,
    });
});
const setPassword = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const decodedToken = req.user;
    const { password } = req.body;
    await auth_service_1.authServices.setPassword(decodedToken.userId, password);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password changed successfully",
        data: null,
    });
});
const resetPassword = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { newPassword, id } = req.body;
    const decodedToken = req.user;
    console.log(newPassword, id);
    await auth_service_1.authServices.resetPassword(newPassword, id, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password changed successfully",
        data: null,
    });
});
const forgotPassword = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { email } = req.body;
    await auth_service_1.authServices.forgotPassword(email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Email sent successfully",
        data: null,
    });
});
const googleCallBackControllers = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    let redirectTo = req.query.state ? req.query.state : " ";
    if (redirectTo.startsWith('/')) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    console.log("from google callback", user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const tokenInfo = (0, UserToken_1.createUserTokrens)(user);
    (0, setCookie_1.setAuthCookies)(res, tokenInfo);
    res.redirect(`${env_1.envVars.FRONTEND_URL}/${redirectTo}`);
});
exports.authControllers = {
    credentialsLogin,
    getNewAccessToken,
    logOut,
    changePassword,
    googleCallBackControllers,
    resetPassword,
    setPassword,
    forgotPassword
};
//# sourceMappingURL=auth.controller.js.map