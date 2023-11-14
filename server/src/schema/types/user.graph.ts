import { GraphQLObjectType, GraphQLString, GraphQLEnumType } from "graphql"

export const EUserRole = new GraphQLEnumType({
    name: "UserRoleEnum",
    description: "User Role Enum",
    values: {
        ADMIN: { value: "admin" },
        STUDENT: { value: "student" },
        TEACHER: { value: "teacher" },
    }
})

export const UserGraph = new GraphQLObjectType({
    name: "UserGraph",
    description: "User Graph",

    fields: {
        username: { type: GraphQLString },
        role: { type: EUserRole },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        uid: { type: GraphQLString },
    }
})