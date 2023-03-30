const express = require("express");
const privateConfig = require('./config/private-config.json');
const { getQueryParameters } = require('./openHIM/initialize.js');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

// middleware
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
// parse the request body as JSON
app.use(bodyParser.json({ type: 'application/fhir+json' }));

// routers
const router = require('./routes/apiRouter')
app.use('/api', router)
app.all('*', (req, res) => {
    try {
        // Starts when a new request is received by the server
        res.send(help);
    } catch (error) {
        // Starts when a new request is received by the server
        res.send(error);
    }
});

const help = `
  <pre>
    ${new Date().toUTCString("en-GB", { timeZone: "UTC" })}
    
    Welcome to the ${privateConfig.appConfig.mediatorName}!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'token' } })

    The following endpoints are available:

    POST /validate
  </pre>
`;
//Server PORT
app.listen(privateConfig.appConfig.PORT, (err) => {
    if (err) console.log(`Error: ${err}`)
    console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
    //openHIM
    // getQueryParameters();
})