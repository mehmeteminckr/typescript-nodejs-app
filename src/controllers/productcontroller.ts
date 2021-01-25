import { ProductRequest } from "../request/ProductRequest";
import { ProductResponse } from "../response/ProductResponse";

export {}

let Product = require('../db/product');
const { validationResult } = require('express-validator');
const { clearCache } = require('../services/cache');

exports.getProducts =async (req, res , next) => {
    let response = new ProductResponse();
    let products =await Product.find({  userId: req.decoded.id}).cache(
        {key:req.decoded.id}
    ).catch(next);
    response.success =true;
    response.results.push(products);
    res.send(response);
}

exports.postProduct = async (req, res, next) =>{

    let request : ProductRequest = req.body;
    let response = new ProductResponse();

    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        response.success = false;
        response.results=errors.array().map(({msg,value}) => ({msg,value}));
        return res.send(response);
    }
    let title= request.title
    let price= request.price;
    let url = request.uri;
    let product = new Product({userId: req.decoded.id, title:title, price:price, url:url});
    await product.save(product).catch(next);
    response.success=true;
    return res.send(response);

}

exports.editProduct = async (req, res ,next) => {

    let request : ProductRequest = req.body;
    let response = new ProductResponse();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        response.success = false;
        response.results=errors.array().map(({msg,value}) => ({msg,value}));
        return res.send(response);
    }
    let title= request.title;
    let price= request.price;
    let url = request.uri;
    let products =await Product.find({  userId: req.decoded.id}).cache(
        {key:req.decoded.id}
    ).catch(next);
    if(products.length === 0){
        next("P_NOTFOUND");
    }
    let product = products.filter((x: any) => x._id == request.productId)[0];
    product.isNew = false;
    product.title = title;
    product.price = price;
    product.url = url;
    product.save(product)
    response.success=true;
    res.send(response);
    clearCache(req.decoded.id);
}