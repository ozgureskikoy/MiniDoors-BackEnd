const sql = require('../../model/dataGuest');
global.config = require('../../helpers/tokenConfig');
const tokenS = require('../../helpers/tokenControl');
const company = require('../companyController')
const mail = require('../../helpers/mailService')



exports.createGuest = async (req, res) => {
    const admin = await tokenS.tokenRead(req.headers['x-access-token']);
    const admin_id = admin.id
    console.log("admin_id ==> ", admin_id);
    const admin_c = admin
    console.log("admin_C ==> ", admin_c);

    const admin_rolee = admin.role
    const admin_role = admin_rolee + "_id"

    let comp_id

    if (admin_rolee == "admin") {
        const comp = await company.findCompanyByName(req.body.comp);
        comp_id = comp.payload.id
        console.log('comp_id for admin ==> ', comp_id);
    } else {
        comp_id = admin.comp
        console.log('comp_id for Compadmin ==> ', comp_id);
    }

    if (comp_id) {


        const response = await sql.createGuest(req.body.name, req.body.surname, req.body.mail, admin_id, comp_id, admin_role);

        if (response.code == 200) {
            var newPassword = response.payload.pass;
            const sendMail = response.payload.mail;

            // const fs = require('fs');
            // const htmlFilePath = './mail.html';
            // fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
            //     if (err) {
            //         console.error('Error reading HTML file:', err);
            //         return;
            //     }
            //     htmlContent = htmlContent.replace('{newPassword}', newPassword);
            //     mail.sendEmailUsingNodemailer(sendMail, "Yeni Şifre", htmlContent, function (error, response) {
            //         if (error) {
            //             console.log('Error:', error);
            //         } else {
            //             console.log('Response:', response);
            //         }
            //     });
            // });
            let result = {
                code: response.code,
                payload: {
                    msg: response.payload.msg
                }
            }
            return res.status(200).send(result)


        } else {
            let result = {
                code: response.code,
                payload: {
                    msg: response.payload.err
                }
            }

            return res.status(406).send(result)

        }
    } else {
        return res.status(404).send({
            code: 4044,
            msg: "Company not found"
        })
    }

};



exports.deleteGuest = async (req, res) => {

    const response = await sql.deleteGuest(req.body.mail)

    if (response.code == 200) {

        return res.status(200).send(response)


    } else {
        return res.status(404).send(response)

    }



};

exports.findGuestByMail = async (mail) => {

    const response = await sql.readByMailGuest(mail);
    if (response) {

        return response;
    } else {

        return;
    }

};

exports.showGuests = async (req, res) => {

    const response = await sql.showGuests(req.body.index, req.body.search_param)
    
    if (response) {
  
      let result = {
        "code": 200,
        "meta": "ok",
        "payload": response
      }
      return res.status(200).send(result)
    } else {
  
      let result = {
        "code": 4044,
        "meta": "Guests not found"
      }
      return res.status(404).send(result)
    }
  
  }
