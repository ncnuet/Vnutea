import TeacherController from "@/controllers/teacher.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const TeacherRouter = Router();

TeacherRouter.get("/", [checkJWT], TeacherController.getAll);
TeacherRouter.get("/:id", [checkJWT], TeacherController.getDetails);


export default TeacherRouter;