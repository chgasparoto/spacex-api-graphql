const graphqlTester = require('graphql-tester');

const { serverUrl } = require('./config');

const { tester } = graphqlTester;
const test = tester({
  url: `${serverUrl}/graphql`,
});

describe('Launch Type', () => {
  it('should return latest launch', async () => {
    const query = `{
      launch {
        flighNumber
        launchYear
        launchDateUTC
        rocket {
          id
          name
        }
      }
    }
    `;

    try {
      const response = await test(query);

      expect(response).toBeObject();
      expect(response.status).toBe(200);
      expect(response.success).toBe(true);
      expect(response.data).toBeObject();

      const { launch } = response.data;
      expect(launch).toBeArray();
      expect(launch[0])
        .toBeObject()
        .toContainAllKeys(['flighNumber', 'launchYear', 'launchDateUTC', 'rocket']);

      return true;
    } catch (error) {
      console.log('error->', error);
      return false;
    }
  });

  it('should return upcoing launches', async () => {
    try {
      const response = await test(`{
        launch(filters: {type: "upcoming"}) {
          flighNumber
          launchYear
          launchDateUTC
          rocket {
            id
            name
          }
        }
      }`);

      expect(response).toBeObject();
      expect(response.status).toBe(200);
      expect(response.success).toBe(true);
      expect(response.data).toBeObject();

      const { launch } = response.data;
      expect(launch).toBeArray();
      expect(launch[0])
        .toBeObject()
        .toContainAllKeys(['flighNumber', 'launchYear', 'launchDateUTC', 'rocket']);
      return true;
    } catch (error) {
      console.log('error->', error);
      return false;
    }
  });
});
