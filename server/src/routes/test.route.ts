import { checkJWT } from "@/middlewares/checkJWT.middler";
import { Request, Response } from "@/types/controller";
import { Router } from "express";

const router: Router = Router();

router.get("/", [checkJWT], (req: Request, res: Response) => res.end());

export default router;