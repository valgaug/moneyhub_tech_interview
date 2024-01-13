const { processData, generateCSV } = require('./dataProcessor');

describe('processData function', () => {
  it('should process investment data correctly', () => {
    const investmentsData = [
      {
        userId: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        date: '2022-01-01',
        investmentTotal: 1000,

        holdings: [{ id: 'company1', investmentPercentage: 0.5 }],
      },
    ];
    const companiesData = [{ id: 'company1', name: 'Company A' }];

    const result = processData(investmentsData, companiesData);
    expect(result).toEqual([
      {
        User: 'user1',
        FirstName: 'John',
        LastName: 'Doe',
        Date: '2022-01-01',
        Holding: 'Company A',
        Value: '500',
      },
    ]);
  });
});

describe('generateCSV function', () => {
  it('should generate CSV string correctly', () => {
    const processedData = [
      {
        User: 'user1',
        FirstName: 'John',
        LastName: 'Doe',
        Date: '2022-01-01',
        Holding: 'Company A',
        Value: '500',
      },
    ];

    const csvString = generateCSV(processedData);
    const expectedString = '|User|First Name|Last Name|Date|Holding|Value|\n' + '|user1|John|Doe|2022-01-01|Company A|500|';

    expect(csvString).toBe(expectedString);
  });
});
