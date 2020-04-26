const express = require('express');
const router = express.Router();

const caseWorker = require('./caseWorker');

router.get('/clients', (req, res) => caseWorker.getAllClients(req, res));
router.get('/clients/:id', (req, res) => caseWorker.getClientByID(req,res))
router.get('/companies', (req, res) => caseWorker.getAllCompanies(req,res));
router.get('/companies/:id', (req, res) => caseWorker.getCompanyByID(req,res))

module.exports = router;