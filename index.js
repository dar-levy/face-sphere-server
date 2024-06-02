const express = require("express");
const app = express();
const { validate } = require("./models/user");

app.use(express.json())


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));