const graphql = require('graphql');

const CompanyType = require('./companyType');
const fetch = require('../helpers/fetch');

const { fetchCompany } = fetch;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  description: 'A rocket by SpaceX',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    stages: { type: GraphQLInt },
    boosters: { type: GraphQLInt },
    country: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve: () => fetchCompany(),
    },
    costPerLaunch: {
      type: GraphQLInt,
      resolve: rocket => rocket.cost_per_launch,
    },
    successRate: {
      type: GraphQLInt,
      resolve: rocket => rocket.success_rate_pct,
    },
    firstFlight: {
      type: GraphQLString,
      resolve: rocket => rocket.first_flight,
    },
  }),
});

module.exports = RocketType;
