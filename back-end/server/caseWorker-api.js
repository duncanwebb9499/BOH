const express = require('express');
const router = express.Router();

const caseWorker = require('./caseWorker');

router.get('/clients', (req, res) => caseWorker.getAllClients(req, res));
router.get('/clients/:id', (req, res) => caseWorker.getClientByID(req,res));
router.get('/companies', (req, res) => caseWorker.getAllCompanies(req,res));
router.get('/companies/:id', (req, res) => caseWorker.getCompaniesByID(req,res));

//router.post('/clients', (req,res) => caseWorker.getClientById(req,res));
router.put('/clients/:id', (req, res) => caseWorker.updateClient(req, res));
router.put('/companies/:id', (req, res) => caseWorker.updateCompany(req, res));

router.post('/clients/add/:id', (req,res) => caseWorker.insertNewClient(req,res));
router.post('/companies/add/:id', (req,res) => caseWorker.insertNewCompany(req,res));

module.exports = router;