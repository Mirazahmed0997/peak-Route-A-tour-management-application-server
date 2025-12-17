import { ITour, ITourType } from "./Tour.interface";
export declare const TourTypeService: {
    createTourType: (payload: ITourType) => Promise<import("mongoose").Document<unknown, {}, ITourType, {}, {}> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllTourTypes: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITourType, {}, {}> & ITourType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPage: number;
            total: number;
        };
    }>;
    updateTourType: (id: string, payload: Partial<ITourType>) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, {}> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteTourType: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, {}> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getSingleTourType: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, {}> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
export declare const TourService: {
    createTour: (payload: ITour) => Promise<import("mongoose").Document<unknown, {}, ITour, {}, {}> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllTour: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITour, {}, {}> & ITour & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPage: number;
            total: number;
        };
    }>;
    updateTour: (id: string, payload: Partial<ITour>) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, {}> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteTour: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, {}> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getSingleTour: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, {}> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
};
//# sourceMappingURL=Tour.service.d.ts.map