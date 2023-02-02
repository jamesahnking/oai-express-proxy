// Express Server 
const corsAnywhere = require('cors-anywhere'); 
const express = require('express');
const apicache = require('apicache');
const cors = require('cors')
require('dotenv').config();

const CORS_PROXY_PORT = 5000;
const APP_PORT = 8080;

// Create CORS-ANYWHERE server
corsAnywhere.createServer({}).listen(CORS_PROXY_PORT, () => {
    console.log(` The interenal CORS Anywhere server has started at ${CORS_PROXY_PORT}`
    );
});

// Create EXPRESS Cache Server
const app = express();

app.get('/*', cacheMiddleware());
app.post('/*', cacheMiddleware());
app.options('/*', cacheMiddleware());

// const path = require('path');
const port = process.env.PORT || 8081;

// Parse incomeing JSON
app.use(express.json());

// Uses the querystring library
app.use(express.urlencoded({ extended: false}));

// Connect routes to server - CALL
app.use('/openai', cors(), require('./routes/openaiRoutes'));


// Listen for server and callback when up and print to console
app.listen(port, ()=> console.log(`External CORS cache server started at port ${APP_PORT}`));


// Cached Middle ware construction
function cacheMiddleware() {
    const cacheOptions = {
      debug: true,
      statusCodes: { include: [200] },
      defaultDuration: 60000,
      appendKey: (req, res) => req.method 
    };
    let cacheMiddleware = apicache.options(cacheOptions).middleware();
    return cacheMiddleware;
  }