const graphql = require('graphql');
const RootQueryType = require('./rootQueryType');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
