import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLEnumType } from "graphql"
import { UserGraph } from "./user.graph"
import { UserQuery, UserQueryMany } from "../queries/user.query"

export const ERoomType = new GraphQLEnumType({
    name: "RoomTypeEnum",
    description: "Room type enum",
    values: {
        P2P: { value: "P2P" },
        GROUP: { value: "Group" },
    }
})

export const RoomGraph: GraphQLObjectType = new GraphQLObjectType({
    name: "RoomGraph",
    description: "Room Graph",

    fields: {
        participants: UserQueryMany,
        name: { type: GraphQLString },
        initiator: UserQuery,
        room_type: { type: ERoomType }
    }
})