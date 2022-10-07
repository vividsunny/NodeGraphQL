var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  //   dbo.collection("customers").findOne({}, function (err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

  //   dbo.collection("customers").find({}).toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

  // dbo
  //   .collection("customers")
  //   .find({  }, { projection: { _id: 0 } })
  //   .sort({ name: -1 })
  //   .limit(5)
  //   .toArray(function (err, data) {
  //     if (err) throw err;
  //     console.log(data);
  //     db.close();
  //   });

  //   dbo.collection("customers").deleteOne({ address: 'Mountain 21' }, function (err, obj) {
  //     if (err) throw err;
  //     console.log(obj);
  //     db.close();
  //   });

  //   dbo.collection("customers").drop(function (err, delOK) {
  //     if (err) throw err;
  //     if (delOK) console.log("Collection deleted");
  //     db.close();
  //   });

  //   dbo
  //     .collection("customers")
  //     .updateOne({ address: "Valley 345" }, {$set:{name: "Mickey", address: "Canyon 123" }}, function (err, res) {
  //       if (err) throw err;
  //       console.log("1 document updated");
  //       db.close();
  //     });

  //   var myquery = { address: /^S/ };
  //   var newvalues = { $set: { name: "Minnie" } };
  //   dbo
  //     .collection("customers")
  //     .updateMany(myquery, newvalues, function (err, res) {
  //       if (err) throw err;
  //       console.log(res.result + " document(s) updated");
  //       db.close();
  //     });

  dbo
    .collection("customers")
    .aggregate([
      {
        $lookup: {
          from: "passwords",
          localField: "name",
          foreignField: "name",
          as: "userdetials",
        },
      },
    ])
    .toArray(function (err, res) {
      if (err) throw err;
      console.log(res);
      db.close();
    });
});


