const graphql = require('graphql');

const RocketType = require('./rocketType');
const CompanyType = require('./companyType');
const fetch = require('../helpers/fetch');

const { GraphQLObjectType, GraphQLString } = graphql;
const { fetchRockets, fetchCompany } = fetch;

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchRockets(args.id),
    },
    company: {
      type: CompanyType,
      resolve: () => fetchCompany(),
    },
  }),
});

module.exports = RootQueryType;
