"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequest = void 0;
var request_1 = require("../models/base/request");
var LoginRequest = /** @class */ (function (_super) {
    __extends(LoginRequest, _super);
    function LoginRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoginRequest;
}(request_1.BaseRequest));
exports.LoginRequest = LoginRequest;
