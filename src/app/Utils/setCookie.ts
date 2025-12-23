import { envVars } from "../Config/env";
import { Response } from "express";

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string
}

export const setAuthCookies = (res: Response, tokenInfo: AuthTokens) => {
    const isProd = envVars.NODE_ENV === "production";
  
    if (tokenInfo.accessToken) {
      res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
    }
  
    if (tokenInfo.refreshToken) {
      res.cookie("refreshToken", tokenInfo.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
  };
  



// import { Response } from "express";
// import { envVars } from "../Config/env";


// export interface AuthTokens {
//     accessToken?: string;
//     refreshToken?: string
// }

// export const setAuthCookies = (res: Response, tokenInfo: AuthTokens) => {
//     console.log("tokenInfo",tokenInfo)
//     if (tokenInfo.accessToken) {
//         res.cookie("accessToken", tokenInfo.accessToken, {
//             httpOnly: true,
//             secure: envVars.NODE_ENV == "production",
//             sameSite: "none"
//         })
//     }

//     if (tokenInfo.refreshToken) {
//         res.cookie("refreshToken", tokenInfo.refreshToken, {
//             httpOnly: true,
//             secure: envVars.NODE_ENV == "production",
//             sameSite: "none"
//         })
//     }
// }