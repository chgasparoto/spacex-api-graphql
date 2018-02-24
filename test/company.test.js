const graphqlTester = require('graphql-tester');

const { tester } = graphqlTester;
const test = tester({
  url: 'http://localhost:5000',
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
        done();
      });
  });
});
