"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const passport_1 = __importDefault(require("passport"));
const env_1 = require("../../Config/env");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.authControllers.credentialsLogin);
router.post('/refreshToken', auth_controller_1.authControllers.getNewAccessToken);
router.post('/log-out', auth_controller_1.authControllers.logOut);
router.post('/setPassword', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), auth_controller_1.authControllers.setPassword);
router.post('/changePassword', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), auth_controller_1.authControllers.changePassword);
router.post('/forgotPassword', auth_controller_1.authControllers.forgotPassword);
router.post('/resetPassword', (0, CheckAuth_1.verifyAuth)(...Object.values(User_interface_1.Role)), auth_controller_1.authControllers.resetPassword);
router.get("/google", async (req, res, next) => {
    const redirect = req.query.redirect || "/";
    passport_1.default.authenticate("google", { scope: ["profile", "email"], state: redirect })(req, res, next);
});
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: `${env_1.envVars.FRONTEND_URL}/login?error=There is Some issues with your account. Please contact with our support team` }), auth_controller_1.authControllers.googleCallBackControllers);
exports.authRoutes = router;
//# sourceMappingURL=auth.route.js.map