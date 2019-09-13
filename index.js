const express = require("express");
const app = express();
const request = require("request");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");

const { check } = require("express-validator");

var jsonParser = bodyParser.json();

// To start the API in the terminal:
// npm install
// npm run server

// POST ROUTE TO GET TOKEN
// =======================

// @route       POST /
// @desc        Get token for admin account
// @access      Public
app.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("password", "Please enter a password with 6 or more characters")
  ],
  jsonParser,
  async (req, res) => {
    request(
      "http://www.mocky.io/V2/5808862710000087232b75ac",
      async (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const usersJSON = JSON.parse(body);
          const { name, password } = req.body;
          try {
            let user;
            for (var i = 0; i < usersJSON.clients.length; i++) {
              if (
                usersJSON.clients[i].name.toLowerCase() == name.toLowerCase()
              ) {
                user = usersJSON.clients[i];
              }
            }

            const payload = {
              user: {
                id: user.id
              }
            };

            const token = jwt.sign(payload, "123", {
              expiresIn: 60 * 24 // expires in 24 hours
            });
            if (user.role == "admin") {
              res.json(token);
            } else {
              res.json(
                "Client is not an admin, please login from an admin account"
              );
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    );
  }
);

// CLIENT ROUTES
// ==============

// @route       GET /users/id/:user_id
// @desc        Get user by user_id
// @access      Public
app.get("/users/id/:user_id", async (req, res) => {
  request(
    "http://www.mocky.io/V2/5808862710000087232b75ac",
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const usersJSON = JSON.parse(body);
        try {
          for (var i = 0; i < usersJSON.clients.length; i++) {
            if (usersJSON.clients[i].id == req.params.user_id) {
              res.send(usersJSON.clients[i]);
            }
          }
        } catch (err) {
          console.error(err.message);
          if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
          }

          res.status(500).send("Server Error");
        }
      } else {
        console.log("Error parsing JSON");
      }
    }
  );
});

// @route       GET /users/username/:user_name
// @desc        Get user by user_name
// @access      Public
app.get("/users/username/:user_name", async (req, res) => {
  request(
    "http://www.mocky.io/V2/5808862710000087232b75ac",
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const usersJSON = JSON.parse(body);
        try {
          for (var i = 0; i < usersJSON.clients.length; i++) {
            if (
              usersJSON.clients[i].name.toLowerCase() ==
              req.params.user_name.toLowerCase()
            ) {
              res.send(usersJSON.clients[i]);
            }
          }
        } catch (err) {
          console.error(err.message);
          if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
          }

          res.status(500).send("Server Error");
        }
      } else {
        console.log("Error parsing JSON");
      }
    }
  );
});

// @route       GET /users/policy/:policy_id
// @desc        Get user by policy_id
// @access      Private
app.get("/users/policy/:policy_id", auth, async (req, res) => {
  request(
    "http://www.mocky.io/v2/580891a4100000e8242b75c5",
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const policiesJSON = JSON.parse(body);
        try {
          for (var i = 0; i < policiesJSON.policies.length; i++) {
            if (policiesJSON.policies[i].id == req.params.policy_id) {
              const policyId = policiesJSON.policies[i].clientId;
              var userId = "";
              request(
                "http://www.mocky.io/V2/5808862710000087232b75ac",
                async (error, response, body) => {
                  const usersJSON = JSON.parse(body);
                  for (var j = 0; j < usersJSON.clients.length; j++) {
                    userId = usersJSON.clients[j].id;
                    if (policyId === userId) {
                      res.send(usersJSON.clients[j]);
                      break;
                    }
                  }
                }
              );
              break;
            } else {
              res.send("policy not found");
            }
            break;
          }
        } catch (err) {
          console.error(err.message);
          if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
          }

          res.status(500).send("Server Error");
        }
      } else {
        console.log("Error parsing JSON");
      }
    }
  );
});

// POLICIES ROUTES
// ===============

// @route       GET /policies/user/:user_name
// @desc        Get policies by user_name
// @access      Private
app.get("/policies/user/:user_name", auth, async (req, res) => {
  request(
    "http://www.mocky.io/V2/5808862710000087232b75ac",
    async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const usersJSON = JSON.parse(body);
        var policiesArray = [];
        try {
          for (var i = 0; i < usersJSON.clients.length; i++) {
            if (
              usersJSON.clients[i].name.toLowerCase() ==
              req.params.user_name.toLowerCase()
            ) {
              var userId = usersJSON.clients[i].id;
              request(
                "http://www.mocky.io/v2/580891a4100000e8242b75c5",
                async (error, response, body) => {
                  const policiesJSON = JSON.parse(body);

                  for (var j = 0; j < policiesJSON.policies.length; j++) {
                    var policyId = policiesJSON.policies[j].clientId;

                    if (userId === policyId) {
                      policiesArray.push(policiesJSON.policies[j]);
                    }
                  }

                  if (policiesArray.length < 1) {
                    policiesArray = ["No policies for this username"];
                  }
                  res.send(policiesArray);
                }
              );
            }
          }
        } catch (err) {
          console.error(err.message);
          if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
          }

          res.status(500).send("Server Error");
        }
      } else {
        console.log("Error parsing JSON");
      }
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
