"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const env_1 = require("./env");
const User_model_1 = require("../Modules/User/User.model");
const User_interface_1 = require("../Modules/User/User.interface");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_local_1 = require("passport-local");
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const isUserExist = await User_model_1.User.findOne({ email });
        if (!isUserExist) {
            return done(null, false, { message: "USER  DOES NOT EXIST" });
        }
        if (!isUserExist?.isVerified) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is not verified");
        }
        if (isUserExist?.isActive === User_interface_1.isActive.BLOCKED) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is blocked");
        }
        if (isUserExist?.isDeleted) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is deleted");
        }
        if (isUserExist?.isActive === User_interface_1.isActive.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is inactive");
        }
        const isGoogleAuthenticated = isUserExist.auths.some(provideObjects => provideObjects.provider === "google");
        if (isGoogleAuthenticated && !isUserExist.password) {
            return done(null, false, { message: "You have authenticated through google. So Please google login first and then set a password for your gmail account" });
        }
        const isPassordMatched = await bcryptjs_1.default.compare(password, isUserExist.password);
        if (!isPassordMatched) {
            return done(null, false, { message: "Wrong Password" });
        }
        return done(null, isUserExist);
    }
    catch (error) {
        console.log(error);
        done(error);
    }
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVars.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.envVars.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(null, false, { message: "No email found" });
        }
        let isUserExist = await User_model_1.User.findOne({ email });
        if (isUserExist && !isUserExist?.isVerified) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is not verified");
        }
        if (isUserExist && isUserExist?.isActive === User_interface_1.isActive.BLOCKED) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is blocked");
        }
        if (isUserExist?.isActive === User_interface_1.isActive.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is inactive");
        }
        if (isUserExist && isUserExist?.isDeleted) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "USER  is deleted");
        }
        if (!isUserExist) {
            isUserExist = await User_model_1.User.create({
                email,
                name: profile.displayName,
                picture: profile.photos?.[0]?.value,
                role: User_interface_1.Role.USER,
                isVerified: true,
                auths: [
                    {
                        provider: "google",
                        providerId: profile.id
                    }
                ]
            });
        }
        return done(null, isUserExist, {
            message: "User create successfully"
        });
    }
    catch (error) {
        console.log(`Google login Error ${error}`);
        return done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id); // store MongoDB _id in session
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await User_model_1.User.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
//# sourceMappingURL=passport.js.map