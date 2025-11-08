import { Router } from "express";
import { userRoutes } from "../Modules/User/User.route";
import path from "path";
import { authRoutes } from "../Modules/Auth/auth.route";
import { divisionRoutes } from "../Modules/Division/Division.route";


export const router= Router()

const moduleRoutes=[
    {
        path:'/user',
        route: userRoutes
    },
    {
        path:'/auth',
        route: authRoutes
    },
    {
        path:'/division',
        route: divisionRoutes
    }
]

moduleRoutes.forEach((route)=>
{
    router.use(route.path,route.route)
})