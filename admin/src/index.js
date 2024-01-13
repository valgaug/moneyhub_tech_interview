const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const request = require('request');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

app.get('/investments/:id', (req, res) => {
  const { id } = req.params;
  request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e);
      res.send(500);
    } else {
      res.send(investments);
    }
  });
});

app.get('/generate-report', async (req, res) => {
  try {
    // Fetch data from investments service

    // Fetch data from financial-companies service

    // Process the data to calculate values

    // Generate CSV string

    // Send the CSV report to the investments service /export route

    // Respond with the CSV as the content of the response
    res.setHeader('Content-Type', 'text/csv');
    // res.send(csvString);
  } catch (error) {
    console.error('Error generating report:', error);
    res.sendStatus(500);
  }
});

app.listen(config.port, (err) => {
  if (err) {
    console.error('Error occurred starting the server', err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});
