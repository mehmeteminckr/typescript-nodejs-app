var jwt = require('jsonwebtoken');
var privateKey = "HelloThisMehmetEminCukurProject";
exports.isAuth = function (req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    try {
        var decoded = jwt.verify(token, privateKey);
        req.decoded = decoded;
        next();
    }
    catch (err) {
        next(new Error("P_AUTH"));
    }
};
