const express = require("express");
const routers = require("./routes/routers");
const app = express();

app.use(express.json());
app.use(routers);

const port = 3333;

app.listen(port, () => console.log("program running"));
