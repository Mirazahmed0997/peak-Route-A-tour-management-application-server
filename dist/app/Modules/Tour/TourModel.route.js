"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRoute = void 0;
const express_1 = require("express");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const Tour_controller_1 = require("./Tour.controller");
const multer_config_1 = require("../../Config/multer.config");
const router = (0, express_1.Router)();
router.post('/create', multer_config_1.multerUpload.array("files"), (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Tour_controller_1.TourControllers.createTour);
router.get('/', Tour_controller_1.TourControllers.getAllTour);
router.get('/:id', Tour_controller_1.TourControllers.getSingleTour);
router.patch('/:id', multer_config_1.multerUpload.array("files"), (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Tour_controller_1.TourControllers.updateTour);
router.delete('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Tour_controller_1.TourControllers.deleteTour);
exports.TourRoute = router;
//# sourceMappingURL=TourModel.route.js.map