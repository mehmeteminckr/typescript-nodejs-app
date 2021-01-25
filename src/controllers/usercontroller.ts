import { LoginRequest } from "../request/LoginRequest";
import { LoginResponse } from "../response/LoginResponse";
const jwt = require('jsonwebtoken');

const  {validationResult} = require("express-validator");
const User = require("../db/user");
const bcrypt = require('bcrypt');
const privateKey = "HelloThisMehmetEminCukurProject";

exports.postLogin = async (req:any, res:any ,next:any) => {

    let request : LoginRequest = req.body;
    let response = new LoginResponse();
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        response.success = false;
        response.results=errors.array().map(({msg,value}) => ({msg,value}));
        return res.send(response);
    }
    let user = await User.findOne({ email: request.email});
    console.log(user);
    let result = await bcrypt.compare(request.password, user.password);
    if(result) {
        let token = await jwt.sign({email: user.email, id : user._id}, privateKey, { expiresIn: '1h' });
        response.success = true;
        res.header('Authorization',"Bearer "+ token);
        return res.send(response);
    }
    response.success = false;
    response.results.push("Password and username dont match");
    return res.send(response);

}

exports.postRegister = async (req : any, res : any , next:any) =>{
    
    let response = new LoginResponse();
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        response.success = false;
        response.results=errors.array().map(({msg,value}) => ({msg,value}));
        return res.send(response);
    }
    let email = req.body.email;
    let password = req.body.password;
    let passwordagain = req.body.passwordagain;
 
    let user = await User.findOne({email: email});
    if(!user) {
        if(password !== passwordagain) {
            response.success = false;
            response.results.push("Password must match")
            res.send(response);
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        let userSave =new User({email:email,password: hashedPassword});
        await userSave.save();
        response.success = true;
        res.send(response);
    }
    else{
        console.log(user)
        response.success = false;
        response.results.push("E-mail is already taken by someone else");
        res.send(response);
    }
 }