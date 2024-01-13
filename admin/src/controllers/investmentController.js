const request = require('request-promise-native');
const config = require('config');
const helper = require('../helpers/dataProcessor');

exports.getInvestmentById = (req, res) => {
  const { id } = req.params;
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e);
      res.send(500);
    } else {
      res.send(investments);
    }
  });
};

exports.generateReport = async (req, res) => {
  try {
    // Fetch data and process it
    const investmentsData = await request({ url: `${config.investmentsServiceUrl}/investments`, json: true });
    const companiesData = await request({ url: `${config.financialCompaniesServiceUrl}/companies`, json: true });
    const processedData = helper.processData(investmentsData, companiesData);
    const csvString = helper.generateCSV(processedData);

    // Send the CSV report to the investments service /export route
    const exportUrl = `${config.investmentsServiceUrl}/investments/export`;
    await request.post({
      url: exportUrl,
      json: true,
      body: { csv: csvString },
    });

    // Respond with the CSV as the content of the response
    res.setHeader('Content-Type', 'text/csv');
    res.send(csvString);
  } catch (error) {
    console.error('Error generating report:', error);
    res.sendStatus(500);
  }
};
