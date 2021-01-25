"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("../models/base/response");
exports.errorMiddleware = function (err, req, res, next) {
    var response = new response_1.BaseResponse();
    if (err.message.startsWith("P")) {
        response.success = false;
        response.results.push("Invalid token");
    }
    else {
        response.success = false;
        response.results.push("System error has occured");
    }
    res.status(500).send(response);
};
