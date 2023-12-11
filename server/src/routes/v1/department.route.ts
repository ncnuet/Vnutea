import DepartmentController from "@/controllers/department.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const router = Router();

router.post("/", [checkJWT, checkRole.bind({ role: ["admin"] })], DepartmentController.create);
router.delete("/:id", [checkJWT, checkRole.bind({ role: ["admin"] })], DepartmentController.delete);

export default router;