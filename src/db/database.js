const jsonServer = require('json-server');
const dbServer = jsonServer.create();
const dbRouter = jsonServer.router('./db.json');
const middleware = jsonServer.defaults();
const port = process.env.DB_PORT || 3001;

dbServer.use(middleware);
dbServer.use(dbRouter);
dbServer.listen(port, () => {
    console.log('JSON Server is running')
});

module.exports = dbServer