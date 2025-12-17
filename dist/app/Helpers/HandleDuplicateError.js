"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    const matchedArrey = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArrey[1]} already Exist`
    };
};
exports.handleDuplicateError = handleDuplicateError;
//# sourceMappingURL=HandleDuplicateError.js.map