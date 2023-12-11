import LabController from "@/controllers/lab.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const LabRouter = Router();

LabRouter.post("/", [checkJWT, checkRole.bind({ role: ["admin"] })], LabController.create);
LabRouter.delete("/:id", [checkJWT, checkRole.bind({ role: ["admin"] })], LabController.delete);

export default LabRouter;