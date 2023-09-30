import { Express } from "express";
import AuthRoute from "./auth.route";
import TestRoute from "./test.route";

export default function route(app: Express) {
    app.use("/auth", AuthRoute);
    app.use("/test", TestRoute);
}