"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divisionControllers = void 0;
const CatchAsync_1 = require("../../Utils/CatchAsync");
const Division_service_1 = require("./Division.service");
const sendResponse_1 = require("../../Utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDivision = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    const payload = {
        ...req.body,
        thumnail: req.file?.path
    };
    const result = await Division_service_1.DivisionService.createDivision(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Division Create successfully",
        data: result,
    });
});
const getDivision = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const query = req.query;
    const divisions = await Division_service_1.DivisionService.getAllDivisions(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Get all Division successfully",
        data: divisions,
    });
});
const getSingleDivision = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const slug = req.params.slug;
    console.log(slug);
    const divisions = await Division_service_1.DivisionService.SingleDivision(slug);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Get single Division successfully",
        data: divisions,
    });
});
const updateDivision = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params;
    const payload = {
        ...req.body,
        thumnail: req.file?.path
    };
    const updatedDivision = await Division_service_1.DivisionService.updateDivision(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Division updated successfully",
        data: updatedDivision,
    });
});
const deleteDivision = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params; // ✅ get division ID from URL
    const deletedDivision = await Division_service_1.DivisionService.deleteDivision(id);
    // ✅ send proper response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Division deleted successfully",
        data: deleteDivision,
    });
});
exports.divisionControllers = {
    createDivision,
    getDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
};
//# sourceMappingURL=Division.controller.js.map