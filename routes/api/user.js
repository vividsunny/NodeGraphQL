//import express from "express";
const e = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../sqldb");

router.get("/", (req, res) => {
  res.send("Hello Word");
});

router.post("/blkps", (req, res) => {
  var status = 400;
  var details = null;
  try {
    const userid = req.body.email;
    const pwd = req.body.password;

    if (userid && pwd) {
      const sql =
        "SELECT * FROM myproject.user WHERE email = '" +
        userid +
        "' AND password = '" +
        pwd +
        "'";
      db.query(sql, (err, result) => {
        console.log(sql, result);
        if (result.length > 0 && err == null) {
          const id = result[0].id;
          const email = result[0].email;
          const name = result[0].name;

          jwt.sign({ user: id, email: email }, "ravitest", (err, token) => {
            if (err == null) {
              const user_data = {
                name: name,
                token: token,
              };

              details = {
                success: true,
                data: user_data,
                message: "Login Successful",
              };
              status = 200;
              res.status(status).send(details).end();
            }
            details = {
              success: false,
              message: "Invalid Username or Password",
            };
            res.status(status).send(details);
          });
        } else {
          details = {
            success: false,
            message: "Invalid Username or Password",
          };
          res.status(status).send(details);
        }
      });
    } else {
      details = {
        success: false,
        message: "Invalid Username or Password",
      };
      res.status(status).send(details);
    }
  } catch (err) {
    details = {
      success: false,
      message: "Unauthorized",
    };
    status = 403;
    res.status(status).send(details);
  }
});

router.get("/deblkps", (req, res) => {
  var status = 400;
  var details = null;
  try {
    var auth = req.headers.authorization;
    var user_data = null;

    if (auth) {
      jwt.verify(auth, "ravitest", (err, authdata) => {
        if (authdata.user && authdata.email && err == null) {
          const sql =
            "SELECT * FROM myproject.user WHERE id = " +
            authdata.user +
            " AND email = '" +
            authdata.email +
            "'";
          db.query(sql, (err, result) => {
            if (result.length > 0 && err == null) {
              const id = result[0].id;
              const email = result[0].email;
              const name = result[0].name;

              status = 200;
              user_data = {
                name: name,
                email: email,
                id: id,
              };

              details = {
                success: true,
                data: user_data,
                message: "User retrieved successfully",
              };
              res.status(status).send(details)
            }
          });
        }
      });
    }
  } catch (err) {
    details = {
      success: false,
      message: "Unauthorized",
    };
    status = 403;
    res.status(status).send(details);
  }
});

module.exports = router;
