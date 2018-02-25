const graphql = require('graphql');

const RocketType = require('./rocketType');
const CompanyType = require('./companyType');
const fetch = require('../helpers/fetch');

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;
const { fetchRockets, fetchCompany } = fetch;

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    rockets: {
      type: new GraphQLList(RocketType),
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => {
        const { id } = args;

        if (id) {
          return fetchRockets(args.id);
        }

        return fetchRockets();
      },
    },
    company: {
      type: CompanyType,
      resolve: fetchCompany,
    },
  }),
});

module.exports = RootQueryType;
