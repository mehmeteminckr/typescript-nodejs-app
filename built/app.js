if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var winston = require("./helpers/logger");
var DenemeResponse = require("./response/deneme").DenemeResponse;
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userRoutes = require('./routes/user');
var productRoutes = require('./routes/products');
var handler = require('./middleware/errorhandler');
require("./services/cache");
var app = express();
var uri = process.env.MONGODB_URL;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('combined', { stream: winston.stream }));
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use(handler.errorMiddleware);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(process.env.PORT);
    console.log("Server has started");
});
