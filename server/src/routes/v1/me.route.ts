import MeController from "@/controllers/me.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const MeRouter = Router();

MeRouter.get("/", [checkJWT], MeController.getProfile);
MeRouter.get("/favorite", [checkJWT], MeController.getFavorite);
MeRouter.post("/favorite", [checkJWT], MeController.addFavorite);
MeRouter.delete("/favorite/:id", [checkJWT], MeController.delFavorite);

export default MeRouter;