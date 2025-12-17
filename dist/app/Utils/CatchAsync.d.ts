import { NextFunction, Request, Response } from "express";
type asynchHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const catchAsynch: (fn: asynchHandler) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=CatchAsync.d.ts.map