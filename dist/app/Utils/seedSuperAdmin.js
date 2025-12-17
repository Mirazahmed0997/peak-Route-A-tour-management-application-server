"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const User_interface_1 = require("../Modules/User/User.interface");
const User_model_1 = require("../Modules/User/User.model");
const env_1 = require("./../Config/env");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User_model_1.User.findOne({ email: env_1.envVars.SUPER_ADMIN_EMAIL });
        if (isSuperAdminExist) {
            console.log("Already have a Super Admin");
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(env_1.envVars.SUPER_ADMIN_PASSWORD, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        const authProvider = {
            provider: "credentials",
            providerId: env_1.envVars.SUPER_ADMIN_EMAIL
        };
        const payload = {
            name: "Super Admin",
            role: User_interface_1.Role.SUPER_ADMIN,
            email: env_1.envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auths: [authProvider]
        };
        const superAdmin = User_model_1.User.create(payload);
        console.log("Super Admin created successfully");
    }
    catch (error) {
        console.log(error);
    }
};
exports.seedSuperAdmin = seedSuperAdmin;
//# sourceMappingURL=seedSuperAdmin.js.map