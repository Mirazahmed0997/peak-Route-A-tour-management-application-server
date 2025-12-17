import { NextFunction, Request, Response } from "express";
export declare const StatsController: {
    getBookingStats: (req: Request, res: Response, nest: NextFunction) => Promise<void>;
    getPaymentStats: (req: Request, res: Response, nest: NextFunction) => Promise<void>;
    getUserStat: (req: Request, res: Response, nest: NextFunction) => Promise<void>;
    getTourStat: (req: Request, res: Response, nest: NextFunction) => Promise<void>;
};
//# sourceMappingURL=StatsController.d.ts.map