const graphql = require('graphql');

const CompanyType = require('./companyType');
const fetch = require('../helpers/fetch');

const { fetchCompany } = fetch;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = graphql;

const MeasureType = new GraphQLObjectType({
  name: 'Measure',
  description: "Info about Rocket's parts measure",
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat },
  }),
});

const MassType = new GraphQLObjectType({
  name: 'Mass',
  description: '',
  fields: () => ({
    kg: { type: GraphQLFloat },
    lb: { type: GraphQLFloat },
  }),
});

const PayloadWeightType = new GraphQLObjectType({
  name: 'PayloadWeight',
  description: '',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    kg: { type: GraphQLFloat },
    lb: { type: GraphQLFloat },
  }),
});

const ThrustType = new GraphQLObjectType({
  name: 'Thrust',
  description: '',
  fields: () => ({
    kN: { type: GraphQLInt },
    lbf: { type: GraphQLInt },
  }),
});

const FirstStageType = new GraphQLObjectType({
  name: 'FirstStage',
  description: '',
  fields: () => ({
    reusable: { type: GraphQLBoolean },
    engines: { type: GraphQLInt },
    fullAmountTons: {
      type: GraphQLInt,
      resolve: rocket => rocket.fuel_amount_tons,
    },
    cores: { type: GraphQLInt },
    burnTimeSec: {
      type: GraphQLInt,
      resolve: rocket => rocket.burn_time_sec,
    },
    thrustSeaLevel: {
      type: ThrustType,
      resolve: rocket => rocket.thrust_sea_level,
    },
    thrustVacuum: {
      type: ThrustType,
      resolve: rocket => rocket.thrust_vacuum,
    },
  }),
});

const PayloadType = new GraphQLObjectType({
  name: 'PayloadType',
  description: '',
  fields: () => ({
    option1: {
      type: GraphQLString,
      resolve: rocket => rocket.option_1,
    },
    option2: {
      type: GraphQLString,
      resolve: rocket => rocket.option_2,
    },
    compositeFairing: {
      type: new GraphQLObjectType({
        name: 'compositeFairing',
        fields: () => ({
          height: { type: MeasureType },
          diameter: { type: MeasureType },
        }),
      }),
      resolve: rocket => rocket.composite_fairing,
    },
  }),
});

const SecondStageType = new GraphQLObjectType({
  name: 'SecondStage',
  description: '',
  fields: () => ({
    engines: { type: GraphQLInt },
    burnTimeSec: {
      type: GraphQLInt,
      resolve: rocket => rocket.burn_time_sec,
    },
    thrust: { type: ThrustType },
    payloads: { type: PayloadType },
  }),
});

const EngineType = new GraphQLObjectType({
  name: 'Engine',
  description: '',
  fields: () => ({
    number: { type: GraphQLInt },
    type: { type: GraphQLString },
    version: { type: GraphQLString },
    layout: { type: GraphQLString },
    engineLossMax: {
      type: GraphQLInt,
      resolve: rocket => rocket.engine_loss_max,
    },
    propellant1: {
      type: GraphQLString,
      resolve: rocket => rocket.propellant_1,
    },
    propellant2: {
      type: GraphQLString,
      resolve: rocket => rocket.propellant_2,
    },
    thrustSeaLevel: {
      type: ThrustType,
      resolve: rocket => rocket.thrust_sea_level,
    },
    thrustVacuum: {
      type: ThrustType,
      resolve: rocket => rocket.thrust_vacuum,
    },
    thrustToWeight: {
      type: GraphQLFloat,
      resolve: rocket => rocket.thrust_to_weight,
    },
  }),
});

const LandingLegsType = new GraphQLObjectType({
  name: 'LandingLegs',
  description: '',
  fields: () => ({
    number: { type: GraphQLInt },
    material: { type: GraphQLString },
  }),
});

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
    description: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve: fetchCompany,
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
    height: { type: MeasureType },
    diameter: { type: MeasureType },
    mass: { type: MassType },
    payloadWeights: {
      type: new GraphQLList(PayloadWeightType),
      resolve: rocket => rocket.payload_weights,
    },
    firstStage: {
      type: FirstStageType,
      resolve: rocket => rocket.first_stage,
    },
    secondStage: {
      type: SecondStageType,
      resolve: rocket => rocket.second_stage,
    },
    engines: { type: EngineType },
    landingLegs: {
      type: LandingLegsType,
      resolve: rocket => rocket.landing_legs,
    },
  }),
});

module.exports = RocketType;
