const graphqlTester = require('graphql-tester');
const { serverUrl } = require('./config');

const { tester } = graphqlTester;

const test = tester({
  url: `${serverUrl}/graphql`,
});

describe('Company', () => {
  it('should fetch company data', async () => {
    const query = `{
      company {
        ceo
        cto
        coo
        name
        summary
        founder
        founded
        vehicles
        employees
        valuation
        headquarters
        launchSites
        testSites
        ctoPropulsion
      }
    }`;

    try {
      const response = await test(query);

      expect(response).toBeObject();
      expect(response.status).toBe(200);
      expect(response.success).toBe(true);
      expect(response.data).toBeObject();

      const { company } = response.data;
      expect(company)
        .toBeObject()
        .toContainAllKeys([
          'ceo',
          'cto',
          'coo',
          'name',
          'summary',
          'founder',
          'founded',
          'vehicles',
          'employees',
          'valuation',
          'headquarters',
          'launchSites',
          'testSites',
          'ctoPropulsion',
        ]);

      expect(company.ceo).toBeString();
      expect(company.cto).toBeString();
      expect(company.coo).toBeString();
      expect(company.name).toBeString();
      expect(company.summary).toBeString();
      expect(company.founder).toBeString();
      expect(company.founded).toBeNumber();
      expect(company.vehicles).toBeNumber();
      expect(company.employees).toBeNumber();
      expect(company.valuation).toBeString();
      expect(company.headquarters).toBeString();
      expect(company.launchSites).toBeNumber();
      expect(company.testSites).toBeNumber();
      expect(company.ctoPropulsion).toBeString();
      return true;
    } catch (error) {
      console.log('error->', error);
      return false;
    }
  });
});
