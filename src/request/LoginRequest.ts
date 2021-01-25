import { BaseRequest } from "../models/base/request";

export class LoginRequest extends BaseRequest {
    email: string;
    password: string;
}