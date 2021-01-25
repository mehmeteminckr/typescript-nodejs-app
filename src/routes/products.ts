import { body } from "express-validator";
const validations = require("../helpers/validationutils");
const productController = require("../controllers/productcontroller");
const isAuth = require("../auth/authcontroller");

export {};

const express = require('express');
const cacheCleaner = require('../middleware/cachecleaner');
const app = express();

app.get('/',isAuth.isAuth,productController.getProducts);

app.post('/add',[
    body('title').isLength({min:1}).withMessage("Title must be at least 1 character long"),
    body('price').isAlphanumeric().withMessage("Price must be a number"),
    body('uri').isURL().withMessage("Url must be in correct format"),
],isAuth.isAuth,cacheCleaner, productController.postProduct);

app.post('/edit',[
    body('title').isLength({min:1}).withMessage("Title must be at least 1 character long"),
    body('price').isAlphanumeric().withMessage("Price must be a number"),
    body('uri').isURL().withMessage("Url must be in correct format")
],isAuth.isAuth, productController.editProduct);

module.exports=app;