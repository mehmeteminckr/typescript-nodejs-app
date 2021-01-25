"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
var ProductModelSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    title: String,
    price: String,
    url: String,
});
module.exports = mongoose.model("ProductModel", ProductModelSchema);
