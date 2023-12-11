import V1Route from "./v1"
import { Express } from "express"
import { createHandler } from "graphql-http/lib/use/express";
import schema from '@/schema';

export default function route(app: Express) {
    app.use("/v1", V1Route)
    app.all('/v1/graphql', createHandler({ schema }));
}