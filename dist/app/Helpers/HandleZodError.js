"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorSources = [];
    message: "Zod Error";
    console.log(err.issues);
    err.issues.forEach((issue) => {
        errorSources.push(({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        }));
    });
    return {
        statusCode: 400,
        message: "Zod Error",
        errorSources
    };
};
exports.handleZodError = handleZodError;
//# sourceMappingURL=HandleZodError.js.map