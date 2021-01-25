const jwt = require('jsonwebtoken');

const privateKey = "HelloThisMehmetEminCukurProject";

exports.isAuth = (req,res,next) => {
    const token =req.headers.authorization.split(' ')[1];
    try {
        let decoded = jwt.verify(token,privateKey);
        req.decoded = decoded ;
        next();
    }
    catch (err){
        next(new Error("P_AUTH"));
    }
}