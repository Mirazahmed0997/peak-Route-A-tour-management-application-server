"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const env_1 = require("../Config/env");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const HandleDuplicateError_1 = require("../Helpers/HandleDuplicateError");
const HandleCastError_1 = require("../Helpers/HandleCastError");
const HandleZodError_1 = require("../Helpers/HandleZodError");
const HandleValidationError_1 = require("../Helpers/HandleValidationError");
const cloudunary_config_1 = require("../Config/cloudunary.config");
const globalError = async (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "Development") {
        console.log(err);
    }
    if (req.file) {
        await (0, cloudunary_config_1.deletImageFromCloudinary)(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = req.files?.map(file => file.path);
        await Promise.all(imageUrls.map(url => (0, cloudunary_config_1.deletImageFromCloudinary)(url)));
    }
    let statusCode = 500;
    let message = `Something went wrong`;
    let errorSources = [
    //     {
    //     "path":"isDeleted",
    //     "message":""
    // }
    ];
    // duplicate error handle
    if (err.code === 11000) {
        const dupicateError = (0, HandleDuplicateError_1.handleDuplicateError)(err);
        statusCode = dupicateError.statusCode;
        message = dupicateError.message;
    }
    // cast/object ID error
    else if (err.name === "CastError") {
        const simplefiedError = (0, HandleCastError_1.handleCastError)(err);
        statusCode = simplefiedError.statusCode;
        message = simplefiedError.message;
    }
    // Zod Error
    else if (err.name === "ZodError") {
        const simplefiedError = (0, HandleZodError_1.handleZodError)(err);
        statusCode = simplefiedError.statusCode;
        simplefiedError.message;
        errorSources = simplefiedError.errorSources;
    }
    // validation error
    else if (err.name === "ValidationError") {
        const simplefiedError = (0, HandleValidationError_1.handleValidationError)(err);
        statusCode = simplefiedError.statusCode;
        errorSources = simplefiedError.errorSources;
        message = simplefiedError.message;
    }
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode,
            message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500,
            message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === "Development" ? err : null,
        stack: env_1.envVars.NODE_ENV === "Development" ? err.stack : null
    });
};
exports.globalError = globalError;
//# sourceMappingURL=GlobalErrorHandler.js.map