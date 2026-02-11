import { Router } from "express";
import studentRoutes from "./student.routes";
import categoryRoutes from "./category.routes";
import courseRoutes from "./course.routes";
import InstructorRoutes from "./instructorRequest.routes";

const appRoutes  = Router()

appRoutes.use("/auth", studentRoutes)
appRoutes.use("/category", categoryRoutes)
appRoutes.use("/course", courseRoutes)
appRoutes.use("/instructor", InstructorRoutes)

export default appRoutes