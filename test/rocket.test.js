const graphqlTester = require('graphql-tester');
const toBeType = require('jest-tobetype');
const { serverUrl } = require('./config');

const { tester } = graphqlTester;
const test = tester({
  url: `${serverUrl}/graphql`,
});

const query = `
{
  rockets(id: "falconheavy") {
    id
    name
    active
    stages
    boosters
    country
    description
    costPerLaunch
    company {
      name
      ceo
      employees
      summary
    }
    successRate
    firstFlight
    height {
      meters
      feet
    }
    diameter {
      meters
      feet
    }
    mass {
      kg
      lb
    }
    payloadWeights {
      id
      name
      kg
      lb
    }
    firstStage {
      reusable
      engines
      fullAmountTons
      cores
      burnTimeSec
      thrustSeaLevel {
        kN
        lbf
      }
      thrustVacuum {
        kN
        lbf
      }
    }
    secondStage {
      engines
      burnTimeSec
      thrust {
        kN
        lbf
      }
      payloads {
        option1
        option2
        compositeFairing {
          height {
            meters
            feet
          }
          diameter {
            meters
            feet
          }
        }
      }
    }
    engines {
      number
      type
      version
      layout
      engineLossMax
      propellant1
      propellant2
      thrustSeaLevel {
        kN
        lbf
      }
      thrustVacuum {
        kN
        lbf
      }
      thrustToWeight
    }
    landingLegs {
      number
      material
    }
  }
}
`;

expect.extend(toBeType);

describe.only('Rocket Type', () => {
  it('should fetch rocket data for the given ID (falconheavy)', async (done) => {
    try {
      const res = await test(query);
      const rocket = res.data.rockets[0];

      expect(res.status).toBe(200);
      expect(res.success).toBe(true);

      expect(res.data.rockets).toBeType('array');
      expect(rocket).toBeType('object');

      expect(rocket.id).toBeType('string');
      expect(rocket.name).toBeType('string');
      expect(rocket.active).toBeType('boolean');
      expect(rocket.boosters).toBeType('number');
      expect(rocket.country).toBeType('string');
      expect(rocket.description).toBeType('string');
      expect(rocket.costPerLaunch).toBeType('number');
      expect(rocket.active).toBeType('boolean');
      expect(rocket.successRate).toBeType('number');
      expect(rocket.firstFlight).toBeType('string');
      expect(rocket.company).toBeType('object');

      expect(rocket.height).toBeType('object');
      expect(rocket.height.meters).toBeType('number');
      expect(rocket.height.feet).toBeType('number');

      expect(rocket.diameter).toBeType('object');
      expect(rocket.diameter.meters).toBeType('number');
      expect(rocket.diameter.feet).toBeType('number');

      expect(rocket.mass).toBeType('object');
      expect(rocket.mass.kg).toBeType('number');
      expect(rocket.mass.lb).toBeType('number');

      expect(rocket.payloadWeights).toBeType('array');
      expect(rocket.payloadWeights[0]).toBeType('object');
      expect(rocket.payloadWeights[0]).toHaveProperty('id');
      expect(rocket.payloadWeights[0].id).toBeType('string');
      expect(rocket.payloadWeights[0]).toHaveProperty('name');
      expect(rocket.payloadWeights[0].name).toBeType('string');
      expect(rocket.payloadWeights[0]).toHaveProperty('kg');
      expect(rocket.payloadWeights[0].kg).toBeType('number');
      expect(rocket.payloadWeights[0]).toHaveProperty('lb');
      expect(rocket.payloadWeights[0].lb).toBeType('number');

      expect(rocket.firstStage).toBeType('object');
      expect(rocket.secondStage).toBeType('object');
      expect(rocket.engines).toBeType('object');
      expect(rocket.landingLegs).toBeType('object');

      done();
    } catch (error) {
      console.log('error->', error);
      done();
    }
  });

  it('should fetch a list of rockets data', async (done) => {
    try {
      const res = await test(`
      {
        rockets {
          id
          name
          active
          country
        }
      }
      `);

      const rocket = res.data.rockets[0];

      expect(res.status).toBe(200);
      expect(res.success).toBe(true);

      expect(res.data.rockets).toBeType('array');

      expect(rocket).toBeType('object');
      expect(rocket).toHaveProperty('id');
      expect(rocket.id).toBeType('string');
      expect(rocket).toHaveProperty('name');
      expect(rocket.name).toBeType('string');
      expect(rocket).toHaveProperty('active');
      expect(rocket.active).toBeType('boolean');
      expect(rocket).toHaveProperty('country');
      expect(rocket.country).toBeType('string');

      done();
    } catch (err) {
      console.log('err->', err);
      done();
    }
  });
});
