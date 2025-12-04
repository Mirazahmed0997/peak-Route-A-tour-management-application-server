import { Router } from "express";
import { verifyAuth } from "../../middlewares/CheckAuth";
import { Role } from "../User/User.interface";



const router=Router()


router.post('/create',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),)
router.get('/',)
router.get('/:id'),
router.patch('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),)
router.delete('/:id',verifyAuth(Role.ADMIN,Role.SUPER_ADMIN),)


export const departmentRouter= router