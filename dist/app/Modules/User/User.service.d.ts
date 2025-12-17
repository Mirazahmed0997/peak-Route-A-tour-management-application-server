import { Iuser } from "./User.interface";
import { JwtPayload } from "jsonwebtoken";
export declare const userServices: {
    createUser: (payload: Partial<Iuser>) => Promise<import("mongoose").Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllUsers: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPage: number;
            total: number;
        };
    }>;
    updateUser: (userId: string, payload: Partial<Iuser>, decotedToken: JwtPayload) => Promise<(import("mongoose").Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deleteUser: (userId: string, decodedToken: JwtPayload) => Promise<(import("mongoose").Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getSingleUser: (userId: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
    }>;
    getUsersProfile: (userId: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, Iuser, {}, {}> & Iuser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
    }>;
};
//# sourceMappingURL=User.service.d.ts.map