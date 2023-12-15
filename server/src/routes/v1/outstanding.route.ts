import OutstandingController from "@/controllers/outstanding.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const OutstandingRouter: Router = Router();

OutstandingRouter.post("/", [checkJWT, checkRole.bind({ role: ["admin"] })], OutstandingController.create);
OutstandingRouter.delete("/:id", [checkJWT, checkRole.bind({ role: ["admin"] })], OutstandingController.delete);
OutstandingRouter.get("/", [checkJWT], OutstandingController.getAll);


export default OutstandingRouter;