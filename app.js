const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const routes = require('./routes/router');
const config = require('./utils/config')
app.use(bodyparser.json());

let options = {
    swaggerDefinition: {
        info: {
            description: 'Http Api bult for Vimond test using express and swagger',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `http://localhost:${config.PORT}`,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
    },
    basedir: __dirname,
    files: ['./controllers/*.js'] 
};


expressSwagger(options)
app.use('',routes)
app.use(function (req, res) {
    res.status(404).send("Not Found")
})


module.exports = app




