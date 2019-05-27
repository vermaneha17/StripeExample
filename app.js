const express = require('express');

const responseHandler = require('./responseHandler');
const routes = require('./routes');

const app = express();
app.use(responseHandler);
app.use(routes);

app.listen(3000, () => {
    console.log('Connected to server');
});