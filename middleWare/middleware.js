const { check, body, query, validationResult } = require('express-validator');
const { emitWarning } = require('process');
var jwt = require('jsonwebtoken');
const tokenS = require('../helpers/tokenControl');
const { error } = require('console');

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
        if (decodedToken.role == "admin") {
            const expirationDate = new Date(decodedToken.exp * 1000);
            console.log('JWT expires at:', expirationDate);

            const currentDate = new Date();
            if (currentDate < expirationDate) {
                next();
            } else {
                console.log('JWT has expired');
                return res.status(403).json({
                    code: "4043",
                    message: 'Forbidden Access Token Expired',
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



