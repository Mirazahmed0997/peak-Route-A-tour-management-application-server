import { NextFunction, Request, Response } from "express";
export declare const verifyAuth: (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=CheckAuth.d.ts.map