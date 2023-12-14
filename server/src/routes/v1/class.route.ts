import ClassController from "@/controllers/class.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { checkRole } from "@/middlewares/checkRole.middler";
import { Router } from "express"

const ClassRouter = Router();

ClassRouter.post("/", [checkJWT, checkRole.bind({ role: ["admin"] })], ClassController.create);
ClassRouter.delete("/:id", [checkJWT, checkRole.bind({ role: ["admin"] })], ClassController.delete);
ClassRouter.post("/:id/comment", [checkJWT], ClassController.addComment)
ClassRouter.delete("/:id/comment/:cid", [checkJWT], ClassController.deleteComment)


export default ClassRouter;