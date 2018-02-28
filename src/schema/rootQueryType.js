const graphql = require('graphql');

const RocketType = require('./rocketType');
const CompanyType = require('./companyType');
const LaunchType = require('./launchType');
const fetch = require('../helpers/fetch');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} = graphql;

const {
  fetchRockets,
  fetchCompany,
  fetchLaunches,
} = fetch;

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    rockets: {
      type: new GraphQLList(RocketType),
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchRockets(args.id ? args.id : null),
    },
    company: {
      type: CompanyType,
      resolve: fetchCompany,
    },
    launch: {
      type: new GraphQLList(LaunchType),
      args: {
        filters: {
          type: new GraphQLInputObjectType({
            name: 'filters',
            fields: () => ({
              id: { type: GraphQLString },
              type: { type: GraphQLString },
            }),
          }),
        },
      },
      resolve: (root, args) => {
        if (!args.filters) {
          return fetchLaunches();
        }

        if (args.filters.type) {
          return fetchLaunches(args.filters.type);
        }

        return fetchLaunches(null, args.filters);
      },
    },
  }),
});

module.exports = RootQueryType;
