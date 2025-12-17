"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const User_interface_1 = require("./User.interface");
const User_model_1 = require("./User.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../Config/env");
const QueryBuilder_1 = require("../../Utils/QueryBuilder");
const User_constant_1 = require("./User.constant");
const createUser = async (payload) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await User_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER ALREADY EXIST");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    console.log(hashedPassword);
    const isPasswordMatch = await bcryptjs_1.default.compare(password, hashedPassword);
    console.log(isPasswordMatch);
    const authProvider = { provider: "credentials", providerId: email };
    const user = User_model_1.User.create({
        email,
        auths: [authProvider],
        password: hashedPassword,
        ...rest
    });
    return user;
};
const updateUser = async (userId, payload, decotedToken) => {
    if (decotedToken.role === User_interface_1.Role.USER || decotedToken.role === User_interface_1.Role.GUIDE) {
        if (!userId == decotedToken.userId) {
            throw new AppError_1.default(401, "You are not authorised");
        }
    }
    const isUserExist = await User_model_1.User.findById(userId);
    if (!isUserExist) {
        {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
    }
    if (decotedToken.role === User_interface_1.Role.ADMIN && isUserExist.role === User_interface_1.Role.SUPER_ADMIN) {
        throw new AppError_1.default(401, "You are not authorised");
    }
    if (isUserExist.isDeleted || isUserExist.isActive === User_interface_1.isActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User unable to be updated");
    }
    if (payload.role) {
        if (decotedToken.role == User_interface_1.Role.USER || decotedToken.role == User_interface_1.Role.GUIDE) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Unauthorized access");
        }
    }
    // if(payload.role===Role.SUPER_ADMIN && decotedToken.role === Role.ADMIN)
    // {
    //      throw new AppError(httpStatus.FORBIDDEN,"Unauthorized access")
    // }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decotedToken.role == User_interface_1.Role.USER || decotedToken.role == User_interface_1.Role.GUIDE) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Unauthorized access");
        }
    }
    const newUpdatedUser = await User_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return newUpdatedUser;
};
const getAllUsers = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(User_model_1.User.find(), query);
    const users = await queryBuilder
        .search(User_constant_1.searchFields)
        .filter()
        .fields()
        .paginate()
        .sort();
    const [data, meta] = await Promise.all([
        users.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const getUsersProfile = async (userId) => {
    const user = await User_model_1.User.findById(userId).select("-password");
    return {
        data: user,
    };
};
const getSingleUser = async (userId) => {
    const user = await User_model_1.User.findById(userId).select("-password");
    return {
        data: user,
    };
};
const deleteUser = async (userId, decodedToken) => {
    const isUserExist = await User_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (isUserExist.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User already deleted");
    }
    if (decodedToken.role === User_interface_1.Role.USER || decodedToken.role === User_interface_1.Role.GUIDE) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Unauthorized access");
    }
    if (decodedToken.role === User_interface_1.Role.ADMIN && isUserExist.role === User_interface_1.Role.SUPER_ADMIN) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Admins cannot delete Super Admins");
    }
    // SOFT DELETE 
    const deletedUser = await User_model_1.User.findByIdAndUpdate(userId, { isDeleted: true, isActive: User_interface_1.isActive.BLOCKED }, { new: true, runValidators: true });
    return deletedUser;
};
exports.userServices = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    getUsersProfile
};
//# sourceMappingURL=User.service.js.map