const app = require("./app");
const port = 22876;

app.listen(port, () => {
    console.log(`Express server is up on port ${port}`);
});