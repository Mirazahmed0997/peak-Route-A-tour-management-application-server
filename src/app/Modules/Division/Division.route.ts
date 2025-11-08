import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { divisionControllers } from "./Division.controller";



const router =Router()

router.post('/create',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.createDivision)
router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.updateDivision)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.deleteDivision)
router.get('/',divisionControllers.getDivision)

export const divisionRoutes= router
