"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourService = exports.TourTypeService = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const Tour_constant_1 = require("./Tour.constant");
const Tour_model_1 = require("./Tour.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const QueryBuilder_1 = require("../../Utils/QueryBuilder");
const cloudunary_config_1 = require("../../Config/cloudunary.config");
// Tour Type Services
const createTourType = async (payload) => {
    const { name } = payload;
    const isTourTypeExist = await Tour_model_1.TourType.findOne({ name });
    if (isTourTypeExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "TOUR TYPE ALREADY EXIST");
    }
    const tourType = Tour_model_1.TourType.create({
        name,
    });
    return tourType;
};
const getAllTourTypes = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(Tour_model_1.TourType.find(), query);
    const tourTypes = await queryBuilder
        .search(Tour_constant_1.TourTypeSearchFields)
        .filter()
        .fields()
        .paginate()
        .sort();
    const [data, meta] = await Promise.all([
        tourTypes.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const getSingleTourType = async (id) => {
    const tourType = await Tour_model_1.TourType.findOne({ _id: id });
    return tourType;
};
const updateTourType = async (id, payload) => {
    // Check if the division exists
    const isExist = await Tour_model_1.TourType.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Tour Type not found");
    }
    // Update division
    const updatedTourType = await Tour_model_1.TourType.findByIdAndUpdate(id, payload, {
        new: true, // return the updated document
        runValidators: true, // run schema validators
    });
    return updatedTourType;
};
const deleteTourType = async (id) => {
    // Check if the division exists
    const isExist = await Tour_model_1.TourType.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Tour Type not found");
    }
    const deleteTourType = await Tour_model_1.TourType.findByIdAndDelete(id);
    return deleteTourType;
};
// Tour Services
const createTour = async (payload) => {
    const isTourExist = await Tour_model_1.Tour.findOne({ title: payload.title });
    if (isTourExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "TOUR ALREADY EXIST");
    }
    const tour = Tour_model_1.Tour.create(payload);
    return tour;
};
const getAllTour = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(Tour_model_1.Tour.find(), query);
    const tours = await queryBuilder
        .search(Tour_constant_1.searchFields)
        .filter()
        .fields()
        .paginate()
        .sort();
    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const getSingleTour = async (id) => {
    const singleTour = await Tour_model_1.Tour.findOne({ _id: id });
    return singleTour;
};
const updateTour = async (id, payload) => {
    const isExist = await Tour_model_1.Tour.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Tour not found");
    }
    //  for include new images with older
    if (payload.images && payload.images.length && isExist.images && isExist.images.length) {
        payload.images = [...payload.images, ...isExist.images];
    }
    // for delete selected images
    if (payload.deleteImages && payload.deleteImages.length && isExist.images && isExist.images.length) {
        const restDbImages = isExist.images.filter(imgUrl => !payload.deleteImages?.includes(imgUrl));
        const updatedPayloadImages = (payload.images || [])
            .filter(imgUrl => !payload.deleteImages?.includes(imgUrl))
            .filter(imgUrl => !restDbImages?.includes(imgUrl));
        payload.images = [...restDbImages, ...updatedPayloadImages];
    }
    const updatedTour = await Tour_model_1.Tour.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    // for delete selected images from cloudinary
    if (payload.deleteImages && payload.deleteImages.length && isExist.images && isExist.images.length) {
        await Promise.all(payload.deleteImages.map(url => (0, cloudunary_config_1.deletImageFromCloudinary)(url)));
    }
    return updatedTour;
};
const deleteTour = async (id) => {
    // Check if the division exists
    const isExist = await Tour_model_1.Tour.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Tour not found");
    }
    const deleteTour = await Tour_model_1.Tour.findByIdAndDelete(id);
    return deleteTour;
};
exports.TourTypeService = {
    createTourType,
    getAllTourTypes,
    updateTourType,
    deleteTourType,
    getSingleTourType
};
exports.TourService = {
    createTour,
    getAllTour,
    updateTour,
    deleteTour,
    getSingleTour
};
//# sourceMappingURL=Tour.service.js.map