"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = exports.deleteUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const CatchAsync_1 = require("../../Utils/CatchAsync");
const User_service_1 = require("./User.service");
const sendResponse_1 = require("../../Utils/sendResponse");
const createUser = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    // req.body = JSON.parse(req.body.data)
    // const payload: Iuser = {
    //   ...req.body,
    //   picture: req.file?.path
    // }
    const payload = req.body;
    const user = await User_service_1.userServices.createUser(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User Create successfully",
        data: user,
    });
});
const updateUser = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    const userId = req.params.id;
    // const token= req.headers.authorization
    // const verifiedToken = verifyToken(token as string,envVars.jwt_access_secret) as JwtPayload
    const verifiedToken = req.user;
    const payload = {
        ...req.body,
        picture: req.file?.path
    };
    const user = await User_service_1.userServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User updated successfully",
        data: user,
    });
});
const getAllUsers = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const query = req.query;
    const result = await User_service_1.userServices.getAllUsers(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Successfully Get all users",
        data: result.data,
        meta: result.meta
    });
});
const getUsersProfile = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const decodedToken = req.user;
    const result = await User_service_1.userServices.getUsersProfile(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Successfully Get users profile",
        data: result,
    });
});
const getSingleUser = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const id = req.params.id;
    const result = await User_service_1.userServices.getUsersProfile(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Successfully Get single profile",
        data: result,
    });
});
exports.deleteUser = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params;
    const verifyToken = req.user;
    // call service with parameters
    const result = await User_service_1.userServices.deleteUser(id, verifyToken);
    // send success response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for successful delete
        message: "User deleted successfully",
        data: result,
    });
});
function next(_error) {
    throw new Error("Function not implemented.");
}
exports.userControllers = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser: exports.deleteUser,
    getSingleUser,
    getUsersProfile
};
//# sourceMappingURL=User.controller.js.map