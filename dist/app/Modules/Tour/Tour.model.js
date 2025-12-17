"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = exports.TourType = void 0;
const mongoose_1 = require("mongoose");
const TourTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});
exports.TourType = (0, mongoose_1.model)("TourType", TourTypeSchema);
const tourSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: false, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String, },
    costFrom: { type: Number },
    depurtureLocation: { type: String, required: false },
    arivalLocationl: { type: String, required: false },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    exCluded: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    amenities: { type: String },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    }
}, {
    timestamps: true
});
tourSchema.pre("save", async function (next) {
    if (this.isModified("title")) {
        const baseSlug = this.title.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let counter = 0;
        while (await exports.Tour.exists({ slug })) {
            slug = `${slug}-${counter++}`;
        }
        this.slug = slug;
    }
    next();
});
tourSchema.pre("findOneAndUpdate", async function (next) {
    const tour = this.getUpdate();
    if (tour.title) {
        const baseSlug = tour.title.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}`;
        let counter = 0;
        while (await exports.Tour.exists({ slug })) {
            slug = `${slug}-${counter++}`;
        }
        tour.slug = slug;
    }
    this.setUpdate(tour);
    next();
});
exports.Tour = (0, mongoose_1.model)("Tour", tourSchema);
//# sourceMappingURL=Tour.model.js.map