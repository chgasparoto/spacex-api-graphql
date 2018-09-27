const graphql = require('graphql');
const RocketType = require('./rocketType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  description: '',
  fields: () => ({
    flighNumber: {
      type: GraphQLInt,
      resolve: launch => launch.flight_number,
    },
    launchYear: {
      type: GraphQLInt,
      resolve: launch => launch.launch_year,
    },
    launchDateUnix: {
      type: GraphQLInt,
      resolve: launch => launch.launch_date_unix,
    },
    launchDateUTC: {
      type: GraphQLString,
      resolve: launch => launch.launch_date_utc,
    },
    launchDateLocal: {
      type: GraphQLString,
      resolve: launch => launch.launch_date_local,
    },
    rocket: {
      type: RocketType,
      resolve: async (launch, args, { loaders }) => {
        const rocket = await loaders.rocket.load(launch.rocket.rocket_id);
        return rocket[0];
      },
    },
    telemetry: {
      type: new GraphQLObjectType({
        name: 'telemetry',
        fields: () => ({
          flightClub: {
            type: GraphQLString,
            resolve: launch => launch.flight_club,
          },
        }),
      }),
    },
    reuse: {
      type: new GraphQLObjectType({
        name: 'reuse',
        fields: () => ({
          core: { type: GraphQLBoolean },
          sideCore1: {
            type: GraphQLBoolean,
            resolve: launch => launch.side_core1,
          },
          sideCore2: {
            type: GraphQLBoolean,
            resolve: launch => launch.side_core2,
          },
          fairings: { type: GraphQLBoolean },
          capsule: { type: GraphQLBoolean },
        }),
      }),
    },
    launchSite: {
      type: new GraphQLObjectType({
        name: 'launchSite',
        fields: () => ({
          siteId: {
            type: GraphQLString,
            resolve: launch => launch.site_id,
          },
          siteName: {
            type: GraphQLString,
            resolve: launch => launch.site_name,
          },
          siteNameLong: {
            type: GraphQLString,
            resolve: launch => launch.site_name_long,
          },
        }),
      }),
      resolve: launch => launch.launch_site,
    },
    launchSuccess: {
      type: GraphQLBoolean,
      resolve: launch => launch.launch_success,
    },
    links: {
      type: new GraphQLObjectType({
        name: 'links',
        fields: () => ({
          missionPatch: {
            type: GraphQLString,
            resolve: launch => launch.mission_patch,
          },
          redditCampaign: {
            type: GraphQLString,
            resolve: launch => launch.reddit_campaign,
          },
          redditLaunch: {
            type: GraphQLString,
            resolve: launch => launch.reddit_launch,
          },
          redditRevovery: {
            type: GraphQLString,
            resolve: launch => launch.reddit_recovery,
          },
          redditMedia: {
            type: GraphQLString,
            resolve: launch => launch.reddit_media,
          },
          presskit: { type: GraphQLString },
          articleLink: {
            type: GraphQLString,
            resolve: launch => launch.article_link,
          },
          videoLink: {
            type: GraphQLString,
            resolve: launch => launch.video_link,
          },
        }),
      }),
    },
    details: { type: GraphQLString },
  }),
});

module.exports = LaunchType;
