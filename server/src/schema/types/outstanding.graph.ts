import { GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLFloat } from "graphql"

export const EOutstandingType = new GraphQLEnumType({
    name: "OutstandingTypeEnum",
    description: "Room type enum",
    values: {
        TEACHER: { value: "teacher" },
        DEPARTMENT: { value: "department" },
        LAB: { value: "lab" }
    }
})

export const OutstandingGraph: GraphQLObjectType = new GraphQLObjectType({
    name: "OutstandingGraph",
    description: "Outstanding Graph",

    fields: {
        image: { type: GraphQLString },
        ref: { type: GraphQLString },
        initiator: { type: GraphQLString },
        type: { type: EOutstandingType },
        createAt: {
            type: GraphQLFloat,
            resolve(parent) {
                return (new Date(parent.createdAt)).getTime()
            }
        },
    }
})