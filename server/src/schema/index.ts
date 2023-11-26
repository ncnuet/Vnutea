import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { roomsQuery } from './queries/room.query';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => ({
       rooms: roomsQuery
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;