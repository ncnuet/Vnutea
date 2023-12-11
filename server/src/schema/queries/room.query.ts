import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { RoomGraph } from "../types/room.graph";
import roomModel from "@/models/room.model";

interface IArgs {
    uid: string;
}

export const roomsQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: new GraphQLList(RoomGraph),

    description: "List all rooms satisfying filter.",
    args: {
        uid: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        // console.log(source, args);

        if (args.uid) {
            return await roomModel.getRoomHasUser(args.uid);
        } else {
            return [];
        }
    }
}