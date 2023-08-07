const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = 3000;

const userRouter = require('./helpers/router.js');
app.use('/deneme', userRouter);


app.listen(port, () => {
    console.log(`${port}. port üzerinden server dinleniyor`);
});

