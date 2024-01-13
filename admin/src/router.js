const express = require('express');
const controller = require('./controllers/investmentController');

const router = express.Router();

router.get('/investments/:id', controller.getInvestmentById);
router.get('/generate-report', controller.generateReport);

module.exports = router;
