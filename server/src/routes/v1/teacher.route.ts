import TeacherController from "@/controllers/teacher.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const TeacherRouter = Router();

// TeacherRouter.post("/getByDep", [checkJWT], TeacherController.getByDepartment);
TeacherRouter.get("/", [checkJWT], TeacherController.getAll);


export default TeacherRouter;