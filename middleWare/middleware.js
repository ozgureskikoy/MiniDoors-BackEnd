const { check, body, query, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const tokenS = require('../helpers/tokenControl');
const comp = require('../model/dataCompany')

exports.typeCheckID = [
    body("id", "id must be integer").isNumeric(),
    check("id", "id is empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]

exports.typeCheckData = [
    body("name", "name must be string").isString(),
    check("name", "name is empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]

exports.typeCheckMail = [
    body("mail", "mail invalid").isEmail(),
    check("mail", "mail is empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]
exports.tokenControl = [
    async (req, res, next) => {
        var token = req.headers['x-access-token'];
        const decodedToken = await tokenS.compareRole(token);
        if (decodedToken.role == "admin" || decodedToken.role == "compadmin") {
            console.log(" In middleware role", decodedToken.role);
            const expirationDate = new Date(decodedToken.exp * 1000);
            console.log('JWT expires at:', expirationDate);

            const currentDate = new Date();
            if (currentDate < expirationDate) {
                next();
            } else {
                console.log('JWT has expired');
                return res.status(403).json({
                    code: "4043",
                    message: 'Access Token Expired',
                });
            }

        } else {

            return res.status(403).json({
                code: "4043",
                message: 'Forbidden Access Token',
            });

        }
    }

]
exports.tokenControlDoor = [
    async (req, res, next) => {
        var token = req.headers['x-access-token'];
        const decodedToken = await tokenS.compareRole(token);
        if (decodedToken.role == "users" || decodedToken.role == "guests") {
            const expirationDate = new Date(decodedToken.exp * 1000);
            console.log('JWT expires at:', expirationDate);

            const currentDate = new Date();
            if (currentDate < expirationDate) {
                next();
            } else {
                console.log('JWT has expired');
                return res.status(403).json({
                    code: "4043",
                    message: 'Access Token Expired',
                });
            }

        } else {

            return res.status(403).json({
                code: "4043",
                message: 'Forbidden Access Token',
            });

        }
    }

]
exports.controlDoor = [
    async (req, res, next) => {
        const compa = req.body.comp_id;
        console.log("middlewarw=> ",compa);
        const control = await comp.readByidCompany(compa)
        if (control.payload.msg=="Company Found") {
           console.log("Company Found");
           next();
        } else {

            return res.status(404).json({
                code: "4044",
                message: 'Company Not Found',
            });

        }
    }

]

exports.typeStatus = [
    body("status", "status must be integer").isString(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]
const A = require('../model/dataLogin');
const { checkLogin } = require('../controllers/loginController');

exports.createControl = [
    async(req, res, next)=>{

      const B = await  A.findUserTypeByEmail(req.body.mail)
      console.log('middWb => ',B[0]);
      if (!B[0]) {
        next()
      }
    else{
        return res.status(401).json({
            code:4001,
            msg:"This mail allready used"
        })
    }
    }

]

