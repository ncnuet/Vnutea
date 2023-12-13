import SearchController from "@/controllers/search.controller";
import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Router } from "express"

const SearchRouter = Router();

SearchRouter.get("/", [checkJWT], SearchController.search);

export default SearchRouter;