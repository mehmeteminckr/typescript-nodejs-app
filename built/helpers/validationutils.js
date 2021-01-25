exports.passwordValidation = function (value, _a) {
    var req = _a.req;
    if (value !== req.body.password) {
        return false;
    }
    return true;
};
