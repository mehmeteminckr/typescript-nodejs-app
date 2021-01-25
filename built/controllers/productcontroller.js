"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProductResponse_1 = require("../response/ProductResponse");
var Product = require('../db/product');
var validationResult = require('express-validator').validationResult;
var clearCache = require('../services/cache').clearCache;
exports.getProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var response, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = new ProductResponse_1.ProductResponse();
                return [4 /*yield*/, Product.find({ userId: req.decoded.id }).cache({ key: req.decoded.id }).catch(next)];
            case 1:
                products = _a.sent();
                response.success = true;
                response.results.push(products);
                res.send(response);
                return [2 /*return*/];
        }
    });
}); };
exports.postProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var request, response, errors, title, price, url, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = req.body;
                response = new ProductResponse_1.ProductResponse();
                return [4 /*yield*/, validationResult(req)];
            case 1:
                errors = _a.sent();
                if (!errors.isEmpty()) {
                    response.success = false;
                    response.results = errors.array().map(function (_a) {
                        var msg = _a.msg, value = _a.value;
                        return ({ msg: msg, value: value });
                    });
                    return [2 /*return*/, res.send(response)];
                }
                title = request.title;
                price = request.price;
                url = request.uri;
                product = new Product({ userId: req.decoded.id, title: title, price: price, url: url });
                return [4 /*yield*/, product.save(product).catch(next)];
            case 2:
                _a.sent();
                response.success = true;
                return [2 /*return*/, res.send(response)];
        }
    });
}); };
exports.editProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var request, response, errors, title, price, url, products, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = req.body;
                response = new ProductResponse_1.ProductResponse();
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    response.success = false;
                    response.results = errors.array().map(function (_a) {
                        var msg = _a.msg, value = _a.value;
                        return ({ msg: msg, value: value });
                    });
                    return [2 /*return*/, res.send(response)];
                }
                title = request.title;
                price = request.price;
                url = request.uri;
                return [4 /*yield*/, Product.find({ userId: req.decoded.id }).cache({ key: req.decoded.id }).catch(next)];
            case 1:
                products = _a.sent();
                if (products.length === 0) {
                    next("P_NOTFOUND");
                }
                product = products.filter(function (x) { return x._id == request.productId; })[0];
                product.isNew = false;
                product.title = title;
                product.price = price;
                product.url = url;
                product.save(product);
                response.success = true;
                res.send(response);
                clearCache(req.decoded.id);
                return [2 /*return*/];
        }
    });
}); };
