import DepartmentController from "@/controllers/department.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const DepartmentRouter = Router();

DepartmentRouter.post("/", [checkJWT, checkRole.bind({ role: ["admin"] })], DepartmentController.create);
DepartmentRouter.delete("/:id", [checkJWT, checkRole.bind({ role: ["admin"] })], DepartmentController.delete);
DepartmentRouter.get("/name", [checkJWT], DepartmentController.getAllDepartmentsName);

export default DepartmentRouter;