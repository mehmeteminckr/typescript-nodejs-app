exports.passwordValidation = (value, {req}) => {
    if(value !== req.body.password){
        return false;
    }
    return true;
}