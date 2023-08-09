const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

const userRouter = require('./router/routerUser');
app.use('/user', userRouter);

const adminRouter = require('./router/adminRouter');
app.use('/admin', adminRouter);

const companyRouter = require('./router/companyRouter');
app.use('/company', companyRouter);

const doorRouter = require('./router/doorRouter');
app.use('/door', doorRouter);

const permRouter = require('./router/permRouter');
app.use('/perm', permRouter);

const { loginUser } = require('./controllers/userControls');
app.use('/login', loginUser)

app.listen(port, () => {
    console.log(`${port}. port üzerinden server dinleniyor`);
});

