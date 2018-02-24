const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    ceo: { type: GraphQLString },
    cto: { type: GraphQLString },
    coo: { type: GraphQLString },
    name: { type: GraphQLString },
    summary: { type: GraphQLString },
    founder: { type: GraphQLString },
    founded: { type: GraphQLInt },
    vehicles: { type: GraphQLInt },
    employees: { type: GraphQLInt },
    valuation: { type: GraphQLInt },
    headquarters: {
      type: GraphQLString,
      resolve: company =>
        `${company.headquarters.address} - 
        ${company.headquarters.city} - 
        ${company.headquarters.state}`,
    },
    launchSites: {
      type: GraphQLInt,
      resolve: company => company.launch_sites,
    },
    testSites: {
      type: GraphQLInt,
      resolve: company => company.test_sites,
    },
    ctoPropulsion: {
      type: GraphQLString,
      resolve: company => company.cto_propulsion,
    },
  }),
});

module.exports = CompanyType;
