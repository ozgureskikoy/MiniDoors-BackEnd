const express = require('express');
const app = express();
app.use(express.json());
const Parser = require('body-parser');

app.use(Parser.urlencoded({ extended: true }));
app.use(Parser.json());

const port = 3000;

const userRouter = require('./router/userRouter');
app.use('/user', userRouter);

const guestRouter = require('./router/guestRouter');
app.use('/guest', guestRouter);

const adminRouter = require('./router/adminRouter');
app.use('/admin', adminRouter);

const companyRouter = require('./router/companyRouter');
app.use('/company', companyRouter);

const doorRouter = require('./router/doorRouter');
app.use('/door', doorRouter);

const permRouter = require('./router/permRouter');
app.use('/perm', permRouter);

const gpermRouter = require('./router/gpermRouter');
app.use('/gperm', gpermRouter);

const logRouter = require('./router/logRouter');
app.use('/log', logRouter);

const cadminRouter = require('./router/compadminRouter');
app.use('/cadmin', cadminRouter);

const sadminRouter = require('./router/subadminRouter');
app.use('/sadmin', sadminRouter);

const loginRouter = require('./router/loginRouter');
app.use('/login', loginRouter);


const checkTime = require('./helpers/guestExp')
checkTime()
const interval = 10 * 60 * 1000;
setInterval(checkTime, interval);


app.listen(port, () => {
    console.log(`${port}. port üzerinden server dinleniyor`);
});

