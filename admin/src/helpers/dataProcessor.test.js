const { processData, generateCSV } = require('./dataProcessor');

describe('processData function', () => {
  it('should process investment data correctly', () => {
    const investmentsData = [
      {
        userId: '2',
        firstName: 'John',
        lastName: 'Doe',
        date: '2022-01-01',
        investmentTotal: 1000,

        holdings: [{ id: '1', investmentPercentage: 0.5 }],
      },
    ];
    const companiesData = [{ id: '1', name: 'The Big Investment Company' }];

    const result = processData(investmentsData, companiesData);
    expect(result).toEqual([
      {
        User: '2',
        FirstName: 'John',
        LastName: 'Doe',
        Date: '2022-01-01',
        Holding: 'The Big Investment Company',
        Value: '500',
      },
    ]);
  });
});

describe('generateCSV function', () => {
  it('should generate CSV string correctly', () => {
    const processedData = [
      {
        User: '2',
        FirstName: 'John',
        LastName: 'Doe',
        Date: '2022-01-01',
        Holding: 'The Big Investment Company',
        Value: '500',
      },
    ];

    const csvString = generateCSV(processedData);
    const expectedString = '|User|First Name|Last Name|Date|Holding|Value|\n' + '|2|John|Doe|2022-01-01|The Big Investment Company|500|';

    expect(csvString).toBe(expectedString);
  });
});
