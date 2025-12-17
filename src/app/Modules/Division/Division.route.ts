import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { divisionControllers } from "./Division.controller";
import { multerUpload } from "../../Config/multer.config";



const router =Router()

router.post('/create',
    multerUpload.single("file"),
    verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
// validateRequest(createDivisionZodSchema),
divisionControllers.createDivision)
router.get('/',divisionControllers.getDivision)
router.get('/:slug',divisionControllers.getSingleDivision)

router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),
multerUpload.single("file"),
// validateRequest(updateDivisionZodSchema),
divisionControllers.updateDivision)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.deleteDivision)


export const divisionRoutes= router
