/**
The value in for the "jwt" property in the response is JSON Web Token (JWT) will decode to this JSON object:

{
  sub: 'testerbob',
  email: 'testerbob@trinity-health.org',
  name: 'Bob Tester',
  iat: 1598632729,
  exp: 1598715274
}
{
    "iss": "Example JWT Issuer",
    "iat": 1627246460,
    "exp": 1658782460,
    "aud": "www.example.com",
    "sub": "demo@example.com",
    "GivenName": "John",
    "Surname": "Demo",
    "Email": "johndemo@example.com"
}

The JWT will be sent as a Bearer token in the authorization header of API requests.
 */

/**
 * Mock authentication endpoint that response
 */

module.exports = (req, res) => {
  const success = {
    user: "demo",
    iss: "Example JWT Issuer",
    iat: 1627246460,
    exp: 1658782460,
    aud: "www.example.com",
    sub: "demo@example.com",
    GivenName: "John",
    Surname: "Demo",
    Email: "johndemo@example.com",
    jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJFeGFtcGxlIEpXVCBJc3N1ZXIiLCJpYXQiOjE2MjcyNDY0NjAsImV4cCI6MTY1ODc4MjQ2MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiZGVtb0BleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG4iLCJTdXJuYW1lIjoiRGVtbyIsIkVtYWlsIjoiam9obmRlbW9AZXhhbXBsZS5jb20ifQ.hAij5cHNS2z1W8SCHk9HVqSsEgaTvv_4rvYvBgPNMwc"
  };

  if (req.body.name === "demo" && req.body.password === "password") {
    res.json(success);
  } else {
    res.status(401);
    res.json({ status: 0 });
  }
};
