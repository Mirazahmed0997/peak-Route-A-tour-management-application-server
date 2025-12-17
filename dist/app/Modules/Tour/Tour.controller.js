"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourControllers = exports.TourTypeControllers = void 0;
const CatchAsync_1 = require("../../Utils/CatchAsync");
const Tour_service_1 = require("./Tour.service");
const sendResponse_1 = require("../../Utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createTourType = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const tourType = await Tour_service_1.TourTypeService.createTourType(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Tour Type Create successfully",
        data: tourType,
    });
});
const getAllTourTypes = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const query = req.query;
    console.log(query);
    const tourTypes = await Tour_service_1.TourTypeService.getAllTourTypes(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Get all Tour Types successfully",
        data: tourTypes,
    });
});
const getSingleTourType = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const tours = await Tour_service_1.TourTypeService.getSingleTourType(id);
    // res.status(httpStatus.CREATED).json({
    //     message: "User successfully created"
    // })
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Get all Tour successfully",
        data: tours,
    });
});
const updateTourType = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params; // ✅ get division ID from URL
    const payload = req.body; // ✅ get update data from request body
    // ✅ call service with both id and payload
    const updatedTourType = await Tour_service_1.TourTypeService.updateTourType(id, payload);
    // ✅ send proper response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Tour Type updated successfully",
        data: updatedTourType,
    });
});
const deleteTourType = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params; // ✅ get division ID from URL
    const deletedTourType = await Tour_service_1.TourTypeService.deleteTourType(id);
    // ✅ send proper response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Tour Type deleted successfully",
        data: deletedTourType,
    });
});
// Tour Controllers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const createTour = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    const payload = {
        ...req.body,
        images: req.files?.map(file => file.path)
    };
    const tour = await Tour_service_1.TourService.createTour(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Tour Create successfully",
        data: tour,
    });
});
const getAllTour = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const query = req.query;
    const tours = await Tour_service_1.TourService.getAllTour(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Get all Tour successfully",
        data: tours,
    });
});
const getSingleTour = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    const tour = await Tour_service_1.TourService.getSingleTour(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Get Tour successfully",
        data: tour,
    });
});
const updateTour = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    const { id } = req.params;
    const payload = {
        ...req.body,
        images: req.files?.map(file => file.path)
    };
    const updatedTour = await Tour_service_1.TourService.updateTour(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Tour updated successfully",
        data: updatedTour,
    });
});
const deleteTour = (0, CatchAsync_1.catchAsynch)(async (req, res, next) => {
    const { id } = req.params; // ✅ get division ID from URL
    const deletedTour = await Tour_service_1.TourService.deleteTour(id);
    // ✅ send proper response
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK, // use 200 for update
        message: "Tour deleted successfully",
        data: deletedTour,
    });
});
exports.TourTypeControllers = {
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType,
    getSingleTourType
};
exports.TourControllers = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
    getSingleTour
};
//# sourceMappingURL=Tour.controller.js.map