const events = require("events");
const fs = require("fs");

var { graphqlHTTP } = require("express-graphql");
var collegeschema = require("./GraphQL/Schemas/demo");
var UserSchema = require("./GraphQL/Schemas/user");

var eventEmitter = new events.EventEmitter();
var buf = new Buffer("Ravi Pambhar");

eventEmitter.emit("userconnection");

eventEmitter.on("userconnect", function () {
  console.log("Event Emmited Successfully");
});

console.log(buf.toJSON(buf.toJSON()));
var buffJosn = buf.toJSON(buf.toJSON(buf.toJSON()));

buffJosn.data.forEach((element) => {
  console.log(buf.toString(undefined, 0, 20, element));
});

var writestream = fs.createWriteStream("files/demofile.txt");
writestream.write("Welcome to my dome.");

writestream.end();

writestream.on("finish", function () {
  fs.writeFile("files/demoile.txt", "Simply Easy Learning!", function (err) {
    if (err) {
      return console.error(err);
    }
  });
});

app.use(
  "/student",
  graphqlHTTP({
    schema: collegeschema,
  })
);
app.use(
  "/users",
  graphqlHTTP({
    schema: UserSchema,
  })
);
