import { GraphQLFieldConfig, GraphQLList } from "graphql"
import { UserGraph } from "../types/user.graph";
import userModel from "@/models/user.model";

export const UserQuery: GraphQLFieldConfig<any, any> = {
    type: UserGraph,
    description: "User Query",

    resolve: async (source, args) => {
        // console.log(source, args);

        if (source.initiator) {
            return (await userModel.getUsers([source.initiator]))[0];
        } else {
            return null;
        }
    }
}

export const UserQueryMany: GraphQLFieldConfig<any, any> = {
    type: GraphQLList(UserGraph),
    description: "User Query Many",

    resolve: async (source, args) => {
        // console.log(source, args);

        if (source.participants) {
            return await userModel.getUsers([...source.participants]);
        } else {
            return [];
        }
    }
}