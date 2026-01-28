import { Router } from "express";
import { loginTeacher, logoutTeacher } from "../controller/teacher.controller";
import { isTeacher } from "../middlewares/teacher.middleware";

const teacherRoutes = Router()

teacherRoutes.post("/login", loginTeacher)
teacherRoutes.post("/logout",isTeacher, logoutTeacher)


export default teacherRoutes