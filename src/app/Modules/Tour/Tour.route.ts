import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { TourTypeControllers } from "./Tour.controller";



const router =Router()

router.post('/create',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),TourTypeControllers.createTourType)
router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),TourTypeControllers.updateTourType)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),TourTypeControllers.deleteTourType)
router.get('/',TourTypeControllers.getAllTourTypes)

export const TourTypeRoute= router