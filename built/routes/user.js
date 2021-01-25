"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validations = require("../helpers/validationutils");
var express = require('express');
var app = express();
var userController = require('../controllers/usercontroller');
app.post('/login', [
    express_validator_1.body('email').isEmail().withMessage("Email is not in right format"),
    express_validator_1.body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], userController.postLogin);
app.post("/register", [
    express_validator_1.body('email').isEmail().withMessage("Email is not in right format"),
    express_validator_1.body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    express_validator_1.body('passwordagain').custom(validations.passwordValidation)
], userController.postRegister);
module.exports = app;
