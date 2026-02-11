import { Router } from "express";
import { validate } from "../validators/student.validator";
import { CreateStudentSchema, StudentLoginSchema, UpdateStudentSchema } from "../dto/student.dto";
import { studentLogin, studentLogout, studentProfile, studentRegister, updateProfile } from "../controller/student.controller";
import { isAuthenticated } from "../middleware/student.middleware";

const studentRoutes = Router()

studentRoutes.post("/register" , validate(CreateStudentSchema), studentRegister)
studentRoutes.post("/login" , validate(StudentLoginSchema), studentLogin)
studentRoutes.post("/logout" , isAuthenticated, studentLogout)
studentRoutes.get("/my-profile" ,isAuthenticated, studentProfile)
studentRoutes.put("/update-profile" ,isAuthenticated, validate(UpdateStudentSchema), updateProfile)


export default studentRoutes