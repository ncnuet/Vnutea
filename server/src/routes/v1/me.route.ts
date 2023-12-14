import MeController from "@/controllers/me.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const MeRouter = Router();

MeRouter.get("/", [checkJWT], MeController.getProfile);
MeRouter.get("/favourite", [checkJWT], MeController.getFavorite);
MeRouter.post("/favourite", [checkJWT], MeController.addFavorite);

export default MeRouter;