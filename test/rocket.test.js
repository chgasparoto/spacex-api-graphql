const graphqlTester = require('graphql-tester');
const toBeType = require('jest-tobetype');

const { tester } = graphqlTester;
const test = tester({
  url: 'https://stark-brushlands-54184.herokuapp.com/graphql',
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
const queryResult = {
  rockets: [
    {
      id: 'falconheavy',
      name: 'Falcon Heavy',
      active: true,
      stages: 2,
      boosters: 2,
      country: 'United States',
      description: 'With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.',
      costPerLaunch: 90000000,
      company: {
        name: 'SpaceX',
        ceo: 'Elon Musk',
        employees: 7000,
        summary: 'SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.',
      },
      successRate: 100,
      firstFlight: '2018-02-06',
      height: {
        meters: 70,
        feet: 229.6,
      },
      diameter: {
        meters: 12.2,
        feet: 39.9,
      },
      mass: {
        kg: 1420788,
        lb: 3125735,
      },
      payloadWeights: [
        {
          id: 'leo',
          name: 'Low Earth Orbit',
          kg: 63800,
          lb: 140660,
        },
        {
          id: 'gto',
          name: 'Geosynchronous Transfer Orbit',
          kg: 26700,
          lb: 58860,
        },
        {
          id: 'mars',
          name: 'Mars Orbit',
          kg: 16800,
          lb: 37040,
        },
        {
          id: 'pluto',
          name: 'Pluto Orbit',
          kg: 3500,
          lb: 7720,
        },
      ],
      firstStage: {
        reusable: true,
        engines: 27,
        fullAmountTons: 1155,
        cores: 3,
        burnTimeSec: 162,
        thrustSeaLevel: {
          kN: 22819,
          lbf: 5130000,
        },
        thrustVacuum: {
          kN: 24681,
          lbf: 5548500,
        },
      },
      secondStage: {
        engines: 1,
        burnTimeSec: 397,
        thrust: {
          kN: 934,
          lbf: 210000,
        },
        payloads: {
          option1: 'dragon',
          option2: 'composite fairing',
          compositeFairing: {
            height: {
              meters: 13.1,
              feet: 43,
            },
            diameter: {
              meters: 5.2,
              feet: 17.1,
            },
          },
        },
      },
      engines: {
        number: 27,
        type: 'merlin',
        version: '1D+',
        layout: 'octaweb',
        engineLossMax: 6,
        propellant1: 'subcooled liquid oxygen',
        propellant2: ' RP-1 kerosene',
        thrustSeaLevel: {
          kN: 845,
          lbf: 190000,
        },
        thrustVacuum: {
          kN: 914,
          lbf: 205500,
        },
        thrustToWeight: 180.1,
      },
      landingLegs: {
        number: 12,
        material: 'carbon fiber',
      },
    },
  ],
};

expect.extend(toBeType);

describe('Rocket Type', () => {
  it('should fetch rocket data for the given ID (falconheavy)', (done) => {
    test(query)
      .then((res) => {
        const rocket = res.data.rockets[0];

        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        expect(res.data).toMatchObject(queryResult);

        expect(rocket.id).toBeType('string');
        expect(rocket.name).toBeType('string');
        expect(rocket.active).toBeType('boolean');

        done();
      });
  });

  it('should fetch a list of rockets data', (done) => {
    test(`
    {
      rockets {
        id
        name
        active
        country
      }
    }
    `)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        expect(res.data).toMatchObject({
          rockets: [
            {
              id: 'falcon1',
              name: 'Falcon 1',
              active: false,
              country: 'Republic of the Marshall Islands',
            },
            {
              id: 'falcon9',
              name: 'Falcon 9',
              active: true,
              country: 'United States',
            },
            {
              id: 'falconheavy',
              name: 'Falcon Heavy',
              active: true,
              country: 'United States',
            },
          ],
        });
        done();
      });
  });
});
