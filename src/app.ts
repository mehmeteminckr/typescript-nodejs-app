if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const winston = require("./helpers/logger");

const { DenemeResponse } = require ("./response/deneme");
const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const productRoutes = require('./routes/products');

const handler = require('./middleware/errorhandler');

require("./services/cache");

const app = express();

const uri = process.env.MONGODB_URL

app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use(morgan('combined', { stream: winston.stream }));

app.use("/user",userRoutes);

app.use("/product",productRoutes);

app.use(handler.errorMiddleware);

mongoose.connect(uri, {useNewUrlParser:true , useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(process.env.PORT);
    console.log("Server has started");
});
