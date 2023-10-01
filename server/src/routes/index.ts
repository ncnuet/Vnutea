import { Express } from "express";
import AuthRouter from "./auth.route";
import ChatRouter from "./chat.route";
import TestRouter from "./test.route";

export default function route(app: Express) {
    app.use("/auth", AuthRouter);
    app.use("/chat", ChatRouter);
    app.use("/test", TestRouter);
}