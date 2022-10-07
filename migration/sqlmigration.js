const db = require("../routes/sqldb");

let createDB = "CREATE DATABASE myproject";
db.query(createDB, (err) => {
  if (err) {
    throw err;
  }
  let createTable =
    "CREATE TABLE myproject.user(id INT(10) AUTO_INCREMENT, name VARCHAR(255),email VARCHAR(255),password VARCHAR(255), PRIMARY KEY(id))";
  db.query(createTable, (err1) => {
    if (err1) {
      throw err1;
    }
    for (let i = 0; i < 50; i++) {
      const detail = {
        name: "user" + i,
        email: "testuser" + i + "@mail.com",
        password: Math.floor(Math.random(8) * 100000000),
      };
      let initsql = "INSERT INTO myproject.user SET ?";
      db.query(initsql, detail, (err) => {
        if (err) {
          throw err;
        }       
      });      
    }
    console.log("Migration completed successfully.");
  });
});
