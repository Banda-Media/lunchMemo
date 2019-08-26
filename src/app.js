const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const groupRouter = require('./routers/group');
const indexRouter = require('./routers/index');

const app = express();

app.use(express.json());
app.use(indexRouter);
app.use(userRouter);
app.use(groupRouter);

module.exports = app;