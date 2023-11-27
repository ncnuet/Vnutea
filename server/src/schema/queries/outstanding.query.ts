import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";

import OutstandingModel from "@/models/outstanding.model";
import { OutstandingGraph } from "../types/outstanding.graph";

export const outstandingQuery: GraphQLFieldConfig<any, any> = {
    type: GraphQLList(OutstandingGraph),
    description: "Outstanding Query",

    resolve: async (source, args) => {
        return await OutstandingModel.get();
    }
}