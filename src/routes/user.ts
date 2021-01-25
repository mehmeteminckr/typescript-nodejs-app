import { body } from "express-validator";
const validations = require("../helpers/validationutils");

export {};

const express = require('express');

const app = express();

const userController = require('../controllers/usercontroller');

app.post('/login',[
    body('email').isEmail().withMessage("Email is not in right format"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long")
], userController.postLogin);

app.post("/register", [
    body('email').isEmail().withMessage("Email is not in right format"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body('passwordagain').custom(validations.passwordValidation)
] ,userController.postRegister);



module.exports = app;
