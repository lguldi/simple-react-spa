const fs = require("fs");
const {
  JWK: { None },
  JWT
} = require("jose");
const dataFile = fs.readFileSync(__dirname + "/roles.json");
const data = JSON.parse(dataFile);

module.exports = (req, res) => {
  console.log("header");
  console.log(req.headers.authorization);
  const authHeader =
    typeof req.headers.authorization === "string"
      ? req.headers.authorization
      : null;
  const token = authHeader ? JWT.decode(authHeader.split(" ")[1]) : null;

  console.log("token");
  console.log(token);

  if (token && token.Email === "johndemo@example.com") {
    res.json(data);
  } else {
    res.json({
      data: {
        roles: []
      }
    });
  }
};
