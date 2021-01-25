import { BaseResponse } from "../models/base/response";

exports.errorMiddleware = (err, req, res, next) => {
    let response = new BaseResponse();

    if((err.message as string).startsWith("P")){
        response.success = false;
        response.results.push("Invalid token");
    }
    else {
        response.success = false;
        response.results.push("System error has occured");
    }
    res.status(500).send(response);
}