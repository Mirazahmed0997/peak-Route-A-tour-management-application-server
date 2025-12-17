"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divisionRoutes = void 0;
const express_1 = require("express");
const CheckAuth_1 = require("../../middlewares/CheckAuth");
const User_interface_1 = require("../User/User.interface");
const Division_controller_1 = require("./Division.controller");
const multer_config_1 = require("../../Config/multer.config");
const router = (0, express_1.Router)();
router.post('/create', multer_config_1.multerUpload.single("file"), (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), 
// validateRequest(createDivisionZodSchema),
Division_controller_1.divisionControllers.createDivision);
router.get('/', Division_controller_1.divisionControllers.getDivision);
router.get('/:slug', Division_controller_1.divisionControllers.getSingleDivision);
router.patch('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), multer_config_1.multerUpload.single("file"), 
// validateRequest(updateDivisionZodSchema),
Division_controller_1.divisionControllers.updateDivision);
router.delete('/:id', (0, CheckAuth_1.verifyAuth)(User_interface_1.Role.ADMIN, User_interface_1.Role.SUPER_ADMIN), Division_controller_1.divisionControllers.deleteDivision);
exports.divisionRoutes = router;
//# sourceMappingURL=Division.route.js.map