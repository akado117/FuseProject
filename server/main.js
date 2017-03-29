import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLToolsTypes from "graphql-tools-types"

import typeDefs from '../imports/api/schema';
import resolvers from '../imports/api/resolvers';
import manualSchema from '../imports/api/manualSchema';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


createApolloServer({
  schema,
  //manualSchema
});

