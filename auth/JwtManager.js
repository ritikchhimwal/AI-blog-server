import jwt from "jsonwebtoken";
import Token from "../models/TokenModel.js";
const { TokenExpiredError } = jwt;

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function generateToken(user) {
  return jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1Year" });
}

export async function authenticateMiddleware(req, resp, next) {
  const token = req.headers.authorization;
  try {
    const claims = jwt.verify(token, SECRET_KEY);
    // check if the token is present in the cache
    const tokenInstance = await Token.findOne({ userId: claims.userId });
    if (!tokenInstance || tokenInstance.token !== token) {
      // token is not present in the cache hence ask the user to re login
      return resp
        .status(401)
        .json({ message: "Invalid user! please login again" });
    }
    req.userId = claims.userId;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.log("token is expired");
    }
    resp.status(401).json({ message: "Login expired! Please login again" });
  }
}
