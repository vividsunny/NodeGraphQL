require("./MongoSchema/db");
const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const cors = require("cors");
const fs = require("fs");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
const { makeExecutableSchema } = require("graphql-tools");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const resolvers = require("./GraphQL/resolver");

var port = process.env.PORT || 8080;
var app = express();
app.use(bodyparser.json(), cors());

const typeDefs = fs.readFileSync("./GraphQL/schema.graphql", {
  encoding: "utf-8",
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use("/graphql", graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(port, () => {
  console.log("listening on *:8080");
});

/////////////////////////////

// app.use(bodyparser.urlencoded({ extended: true }));

// app.use("/student", require("./controller/controler1"));

// app.set("views", path.join(__dirname, "/views/"));

// app.engine(
//   "hbs",
//   exphbs.engine({
//     handlebars: allowInsecurePrototypeAccess(handleBars),
//     extname: "hbs",
//     defaultLayout: "mainLayout",
//     layoutsDir: __dirname + "/views/layouts/",
//   })
// );

// app.set("view engine", "hbs");

///////////////////////////////

// const http = require("http");
// const { Server } = require("socket.io");

// const server = http.createServer(app);
// const io = new Server(server);

// app.use("/user", require("./controller/controler1"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use("/user", require("./routes/api/user"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/files/demo.html");
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
