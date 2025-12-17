import { Idivision } from "./Division.interface";
export declare const DivisionService: {
    createDivision: (payload: Idivision) => Promise<import("mongoose").Document<unknown, {}, Idivision, {}, {}> & Idivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllDivisions: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Idivision, {}, {}> & Idivision & {
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
    SingleDivision: (slug: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Idivision, {}, {}> & Idivision & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    updateDivision: (id: string, payload: Partial<Idivision>) => Promise<(import("mongoose").Document<unknown, {}, Idivision, {}, {}> & Idivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteDivision: (id: string) => Promise</*elided*/ any>;
};
//# sourceMappingURL=Division.service.d.ts.map