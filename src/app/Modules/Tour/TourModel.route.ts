import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";
import { TourControllers, TourTypeControllers } from "./Tour.controller";



const router =Router()

router.post('/create',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),TourControllers.createTour)
router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),TourControllers.updateTour)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),TourControllers.deleteTour)
router.get('/',TourControllers.getAllTour)

export const TourRoute= router