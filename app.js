const express = require('express');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

// const mail= require('./helpers/mailService')
// const fs = require('fs');
// const htmlFilePath = './mail.html';
// fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
//     if (err) {
//       console.error('Error reading HTML file:', err);
//       return;
//     }

//     mail.sendEmailUsingNodemailer('ozguresk02@gmail.com', 'Yeni Şifre', htmlContent, function(error, response) {
//       if (error) {
//         console.log('Error:', error);
//       } else {
//         console.log('Response:', response);
//       }
//     });
//   });


  

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

