"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionService = void 0;
const cloudunary_config_1 = require("../../Config/cloudunary.config");
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const QueryBuilder_1 = require("../../Utils/QueryBuilder");
const Division_constant_1 = require("./Division.constant");
const Division_model_1 = require("./Division.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createDivision = async (payload) => {
    const isDivisionExist = await Division_model_1.Division.findOne({ name: payload.name });
    if (isDivisionExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Division  ALREADY EXIST");
    }
    const division = Division_model_1.Division.create(payload);
    return division;
};
const getAllDivisions = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(Division_model_1.Division.find(), query);
    const divisions = await queryBuilder
        .search(Division_constant_1.searchFields)
        .filter()
        .fields()
        .paginate()
        .sort();
    const [data, meta] = await Promise.all([
        divisions.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
const SingleDivision = async (slug) => {
    const division = await Division_model_1.Division.findOne({ slug });
    return {
        data: division,
    };
};
const updateDivision = async (id, payload) => {
    const isExist = await Division_model_1.Division.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Division not found");
    }
    const updatedDivision = await Division_model_1.Division.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (payload.thumnail && isExist.thumnail) {
        await (0, cloudunary_config_1.deletImageFromCloudinary)(isExist.thumnail);
    }
    return updatedDivision;
};
const deleteDivision = async (id) => {
    // Check if the division exists
    const isExist = await Division_model_1.Division.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Division not found");
    }
    const deletedDivision = await Division_model_1.Division.findByIdAndDelete(id);
    return deleteDivision;
};
exports.DivisionService = {
    createDivision,
    getAllDivisions,
    SingleDivision,
    updateDivision,
    deleteDivision
};
//# sourceMappingURL=Division.service.js.map