import { NextFunction, Request, Response } from "express";
export declare const PaymentController: {
    successPayment: (req: Request, res: Response, next: NextFunction) => void;
    failPayment: (req: Request, res: Response, next: NextFunction) => void;
    cancelPayment: (req: Request, res: Response, next: NextFunction) => void;
    initPayment: (req: Request, res: Response, next: NextFunction) => void;
    getInvoiceDownloadUrl: (req: Request, res: Response, next: NextFunction) => void;
    validatePayment: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=Payment.controller.d.ts.map