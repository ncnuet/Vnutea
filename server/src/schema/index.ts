import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { roomsQuery } from './queries/room.query';
import { outstandingQuery } from './queries/outstanding.query';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => ({
       rooms: roomsQuery,
       outstanding: outstandingQuery
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;