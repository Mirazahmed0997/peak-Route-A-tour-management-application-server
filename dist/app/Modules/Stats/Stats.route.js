"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsRouter = void 0;
const express_1 = require("express");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const StatsController_1 = require("./StatsController");
const router = (0, express_1.Router)();
router.get('/bookingStat', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), StatsController_1.StatsController.getBookingStats);
router.get('/paymentStat', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), StatsController_1.StatsController.getPaymentStats);
router.get('/userStat', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), StatsController_1.StatsController.getUserStat);
// router.get('/userStat',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),StatsController.getUserStat)
router.get('/tourStat', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), StatsController_1.StatsController.getTourStat);
exports.statsRouter = router;
//# sourceMappingURL=Stats.route.js.map