import { JwtPayload } from "jsonwebtoken";
export declare const authServices: {
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: {
            accesToken: string;
        };
    }>;
    resetPassword: (newPassword: string, id: string, decodedToken: JwtPayload) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<boolean>;
    setPassword: (userId: string, plainPassword: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map