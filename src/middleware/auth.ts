import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

export function authorizeToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.GOOGLE_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export const verifyGoogleToken = async (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_PUBLIC);
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_PUBLIC,
    });
    req.google = ticket.getPayload();
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
