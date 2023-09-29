import { Express } from "express";
import AuthRoute from "./auth.route";

export default function route(app: Express) {
    app.use("/auth", AuthRoute);
}