const express = require('express');
const router = express.Router();

const clients = require('./clients');

router.get('/status-codes', (req, res) => clients.getStatusCodes(req, res));
router.get('/:id', (req, res) => clients.getById(req, res));
router.get('/', (req, res) => clients.getAll(req, res));

module.exports = router;