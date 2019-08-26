const dbServer = require('./db/database')
const express = require('express');
const userRouter = require('./routers/user');
const groupRouter = require('./routers/group');
const indexRouter = require('./routers/index');

const app = express();

app.use(express.json());
app.use('/', indexRouter);
app.use('/', groupRouter);
app.use('/', userRouter);

var path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
