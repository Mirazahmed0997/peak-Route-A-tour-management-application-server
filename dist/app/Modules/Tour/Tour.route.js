"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourTypeRoute = void 0;
const express_1 = require("express");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const Tour_controller_1 = require("./Tour.controller");
const router = (0, express_1.Router)();
router.post('/create', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Tour_controller_1.TourTypeControllers.createTourType);
router.get('/', Tour_controller_1.TourTypeControllers.getAllTourTypes);
router.get('/:id', Tour_controller_1.TourTypeControllers.getSingleTourType);
router.patch('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Tour_controller_1.TourTypeControllers.updateTourType);
router.delete('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Tour_controller_1.TourTypeControllers.deleteTourType);
exports.TourTypeRoute = router;
//# sourceMappingURL=Tour.route.js.map