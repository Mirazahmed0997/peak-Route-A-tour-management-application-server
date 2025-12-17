import { Response } from "express";
interface Tmeta {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
}
interface Tresponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta?: Tmeta;
}
export declare const sendResponse: <T>(res: Response, data: Tresponse<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map