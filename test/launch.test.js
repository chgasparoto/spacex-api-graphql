const graphqlTester = require('graphql-tester');

const { tester } = graphqlTester;
const test = tester({
  url: 'https://stark-brushlands-54184.herokuapp.com/graphql',
});

describe('Launch Type', () => {
  it('should return latest launch', async () => {
    const response = await test(`{
      launch {
        flighNumber
        launchYear
        launchDateUTC
        rocket {
          id
          name
        }
      }
    }`);

    expect(response.status).toBe(200);
    expect(response.success).toBe(true);
    expect(response.data).toMatchObject({
      launch: [
        {
          flighNumber: 56,
          launchYear: 2018,
          launchDateUTC: '2018-02-22T14:17:00Z',
          rocket: {
            id: 'falcon9',
            name: 'Falcon 9',
          },
        },
      ],
    });
  });

  it('should return upcoing launches', async () => {
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

    expect(response.status).toBe(200);
    expect(response.success).toBe(true);
    expect(response.data).toMatchObject({
      launch: [
        {
          flighNumber: 57,
          launchYear: 2018,
          launchDateUTC: '2018-03-01T05:34:00Z',
          rocket: {
            id: 'falcon9',
            name: 'Falcon 9',
          },
        },
        {
          flighNumber: 58,
          launchYear: 2018,
          launchDateUTC: '2018-03-29T00:00:00Z',
          rocket: {
            id: 'falcon9',
            name: 'Falcon 9',
          },
        },
      ],
    });
  });
});
