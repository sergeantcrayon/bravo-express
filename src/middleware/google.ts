export const verifyGoogleJwt = async (req, res, next) => {
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client('1059930658367-0g2gr8h3s249gpcqnd4j16vubh1ebk08.apps.googleusercontent.com');

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '1059930658367-0g2gr8h3s249gpcqnd4j16vubh1ebk08.apps.googleusercontent.com',
    });
    req.googleTokenId = ticket.getPayload();
  } catch {
  } finally {
    next();
  }
};
