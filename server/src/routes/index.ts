import V1Route from "./v1"
import { Express } from "express"

export default function route(app: Express) {
    app.use("/v1", V1Route)
}