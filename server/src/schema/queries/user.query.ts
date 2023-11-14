import { GraphQLFieldConfig, GraphQLString, GraphQLUnionType, GraphQLList } from "graphql"
import { UserGraph } from "../types/user.graph";
import userModel from "@/models/user.model";

interface IArgs {
    uid: string;
}

export const UT = new GraphQLUnionType({
    name: "a",
    description: "",
    types: [UserGraph, GraphQLList<UserGraph>],

    resolveType: (value) => {
        return UserGraph;
    }
})

export const UserQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: UT,
    description: "User Query",

    args: {
        uid: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        console.log(source, args);
        if (args.uid) {
            return await userModel.getUser(args.uid);
        } else if (source.initiator) {
            return await userModel.getUser(source.initiator.toString());
        } else {
            return null;
        }
    }
}