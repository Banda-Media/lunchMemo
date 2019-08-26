const path = require('path')
const jsonServer = require('json-server');
const dbServer = jsonServer.create();
const dbRouter = jsonServer.router(path.join(__dirname, 'db.json'));
const middleware = jsonServer.defaults();
const port = process.env.DB_PORT || 3001;

dbServer.use(middleware);
dbServer.use(dbRouter);
dbServer.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`)
});

module.exports = dbServer