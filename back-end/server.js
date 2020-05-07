const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4200']
};
app.use(cors(corsOptions));
// CORS controls from the security blog post
app.all('/*', (req, res, next) => {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict all access to the required domains
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;

// implement a shared PostgreSQL pool for use throughout the app
app.set('pool', require('./server/pg-connector'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// implement API routes
const api = require('./server/api.js');
const clientsAPI = require('./server/clients-api');
const companiesAPI = require('./server/companies-api');
const caseWorkerAPI = require('./server/caseWorker-api');

app.use('/api', api);
app.use('/clients', clientsAPI);
app.use('/companies', companiesAPI);
app.use('/caseworker', caseWorkerAPI);

// catch all other routes and return just a simple message
app.all('*', (req, res) => res.send('Hi, this is not a real place'));

const server = http.createServer(app);
server.listen(port, () => console.log(`Beacon of Hope backend service app listening on port ${port}!`));