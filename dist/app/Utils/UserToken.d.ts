import { Iuser } from "../Modules/User/User.interface";
export declare const createUserTokrens: (user: Partial<Iuser>) => {
    accesToken: string;
    refreshToken: string;
};
export declare const createNewAccessTokenWithrefreshToken: (refreshToken: string) => Promise<{
    accesToken: string;
}>;
//# sourceMappingURL=UserToken.d.ts.map