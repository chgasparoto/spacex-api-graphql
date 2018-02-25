const graphqlTester = require('graphql-tester');

const { tester } = graphqlTester;
const test = tester({
  url: 'https://stark-brushlands-54184.herokuapp.com/graphql',
});

describe('Company', () => {
  it('should fetch company data', (done) => {
    test(`{
      company {
        name
        ceo
        employees
      }
    }`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        expect(res.data).toMatchObject({
          company: {
            name: 'SpaceX',
            ceo: 'Elon Musk',
            employees: 7000,
          },
        });
        done();
      });
  });
});
