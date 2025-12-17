"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        meta: data.meta,
        data: data.data
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=sendResponse.js.map