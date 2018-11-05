const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routers
const waiterRouter = require('./api/routers/waiters');
const categoryRouter = require('./api/routers/categories');
const productRouter = require('./api/routers/products');
const tableRouter = require('./api/routers/tables');
const reservationRouter = require('./api/routers/reservations');
const orderRouter = require('./api/routers/orders');

//mongoose.connect('mongodb://localhost:27017/XKitchen');
mongoose.connect('mongodb://admin:admin1234@ds115749.mlab.com:15749/xkitchen');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/waiters', waiterRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/tables', tableRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/orders', orderRouter);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

module.exports = app;