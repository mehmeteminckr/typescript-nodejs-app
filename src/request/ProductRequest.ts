import { BaseRequest } from "../models/base/request";

export class ProductRequest extends BaseRequest {
    title: string;
    price: number;
    uri : any;
    productId : any;
}