import { NextFunction, Request, Response } from "express";
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => void;
export declare const userControllers: {
    createUser: (req: Request, res: Response, next: NextFunction) => void;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
    updateUser: (req: Request, res: Response, next: NextFunction) => void;
    deleteUser: (req: Request, res: Response, next: NextFunction) => void;
    getSingleUser: (req: Request, res: Response, next: NextFunction) => void;
    getUsersProfile: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=User.controller.d.ts.map