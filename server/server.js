const express = require('express');

const app = express();

const test= require('./Router/api');

app.use('/api', test);

const port = 5000;
app.listen(port, ()=> console.log(`connecting ${port} port.`));