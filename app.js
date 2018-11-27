const products = require('./products.json');
const http = require('http');
const _ = require('underscore');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/':
            logger.info("for (GET) [/]");
            res.write("Home page - Containerizing a simple node app using HTTP module");
            res.end();
            break;

        case '/api/numbers':
            logger.info("for (GET) [/api/numbers]");
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(getNumbers()));
            res.end();
            break;

        case '/api/products':
            logger.info("for (GET) [/api/products]");
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(getProducts()));
            res.end();
            break;

        case '/favicon.ico':
            res.statusCode = 200;
            res.end();
            break;

        default:
            logger.error(`Wrong URL for (GET) [${req.url}]`);
            res.statusCode = 404;
            res.end();
    }
});

server.listen(3300);
console.log("Listening on Port 3300");

function getNumbers() {
    return [1, 2, 3, 4, 5];
}

function getProducts() {
    const { data } = products;
    const _products = _.map(data, (obj) => {
        return _.mapObject(obj, (val, key) => val = key === 'price' ? val + ' $' : val);
    });
    return _products;
}