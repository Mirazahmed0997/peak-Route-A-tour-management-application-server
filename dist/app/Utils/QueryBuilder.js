"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const globalConstants_1 = require("../globalConstants");
class QueryBuilder {
    modelQuery;
    query;
    constructor(modelquery, query) {
        this.modelQuery = modelquery;
        this.query = query;
    }
    filter() {
        const filter = { ...this.query };
        for (const field of globalConstants_1.excludFields) {
            delete filter[field];
        }
        this.modelQuery = this.modelQuery.find(filter);
        return this;
    }
    // search(searchableField: string[]): this {
    //     const searchTerm = this.query.searchTerm || ""
    //     const searchQuery = {
    //         $or: searchableField.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))
    //     }
    //     this.modelQuery = this.modelQuery.find(searchQuery)
    //     return this
    // }
    search(searchableFields) {
        const searchTerm = this.query.searchTerm;
        if (!searchTerm)
            return this;
        const orQueries = [];
        for (const field of searchableFields) {
            // check if field is ObjectId
            if (mongoose_1.default.Types.ObjectId.isValid(searchTerm)) {
                orQueries.push({ [field]: searchTerm });
            }
            else {
                // normal regex search for string fields
                orQueries.push({
                    [field]: { $regex: searchTerm, $options: "i" }
                });
            }
        }
        this.modelQuery = this.modelQuery.find({ $or: orQueries });
        return this;
    }
    sort() {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    fields() {
        const fields = this.query.fields?.split(",").join(" ") || "";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    build() {
        return this.modelQuery;
    }
    async getMeta() {
        const totalDocuments = await this.modelQuery.model.countDocuments();
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const totalPage = Math.ceil(totalDocuments / limit);
        return {
            page,
            limit,
            totalPage,
            total: totalDocuments
        };
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map