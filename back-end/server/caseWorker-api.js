const express = require('express');
const router = express.Router();

const caseWorker = require('./caseWorker');

router.get('/clients', (req, res) => caseWorker.getAllClients(req, res));
router.get('/clients/:id', (req, res) => caseWorker.getClientById(req,res));
router.get('/companies', (req, res) => caseWorker.getAllCompanies(req,res));
router.get('/companies/:id', (req, res) => caseWorker.getCompanyById(req,res));

//router.post('/clients', (req,res) => caseWorker.getClientById(req,res));
router.put('/clients/:id', (req, res) => caseWorker.update(req, res));

module.exports = router;