exports.processData = (investmentsData, companiesData) => {
  const processedData = [];
  investmentsData.forEach((investment) => {
    investment.holdings.forEach((holding) => {
      const company = companiesData.find((company) => company.id === holding.id);
      const value = investment.investmentTotal * holding.investmentPercentage;
      processedData.push({
        User: investment.userId,
        FirstName: investment.firstName,
        LastName: investment.lastName,
        Date: investment.date,
        Holding: company.name,
        Value: value.toFixed(0),
      });
    });
  });
  return processedData;
};

exports.generateCSV = (processedData) => {
  const headers = '|User|First Name|Last Name|Date|Holding|Value|\n';
  const csvRows = processedData.map((row) => {
    return `|${row.User}|${row.FirstName}|${row.LastName}|${row.Date}|${row.Holding}|${row.Value}|`;
  });
  return headers + csvRows.join('\n');
};
