const dbServer = require('./db/database')
const express = require('express');
const userRouter = require('./routers/user');
const groupRouter = require('./routers/group');
const indexRouter = require('./routers/index');
const restaurantRouter = require('./routers/restaurant');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(allowCrossDomain)
app.use(express.json());
app.use('/', indexRouter);
app.use('/', groupRouter);
app.use('/', userRouter);
app.use('/', restaurantRouter);

var path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;