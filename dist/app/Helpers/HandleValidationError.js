"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = [];
    const errors = Object.values(err.errors);
    errors.forEach((errorObject) => errorSources.push({
        path: errorObject.path,
        message: errorObject.message
    }));
    console.log(errorSources);
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    };
};
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=HandleValidationError.js.map