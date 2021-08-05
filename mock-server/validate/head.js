/**
 * Mock endpoint to simulate a token validation response to the client indicating the
 * incoming JSON Web Token is valid.
 */

module.exports = (req, res) => {
  res.status(200);
  res.send();
};
