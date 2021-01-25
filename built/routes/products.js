"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validations = require("../helpers/validationutils");
var productController = require("../controllers/productcontroller");
var isAuth = require("../auth/authcontroller");
var express = require('express');
var cacheCleaner = require('../middleware/cachecleaner');
var app = express();
app.get('/', isAuth.isAuth, productController.getProducts);
app.post('/add', [
    express_validator_1.body('title').isLength({ min: 1 }).withMessage("Title must be at least 1 character long"),
    express_validator_1.body('price').isAlphanumeric().withMessage("Price must be a number"),
    express_validator_1.body('uri').isURL().withMessage("Url must be in correct format"),
], isAuth.isAuth, cacheCleaner, productController.postProduct);
app.post('/edit', [
    express_validator_1.body('title').isLength({ min: 1 }).withMessage("Title must be at least 1 character long"),
    express_validator_1.body('price').isAlphanumeric().withMessage("Price must be a number"),
    express_validator_1.body('uri').isURL().withMessage("Url must be in correct format")
], isAuth.isAuth, productController.editProduct);
module.exports = app;
