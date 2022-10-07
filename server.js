var express = require("express");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
require("./MongoSchema/db");

var app = express();

app.use(bodyparser.json(), cors());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "/views/"));

app.use("/student", require("./controller/controler1"));

app.engine(
  "hbs",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handleBars),
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);

app.set("view engine", "hbs");

app.listen(4000);
