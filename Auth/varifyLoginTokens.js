import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";

export async function AuthenticateLoginToken(req, res, next) {
  const authToken = req.headers.authorization;
  console.log(authToken);

  if (!authToken || !authToken.startsWith("Bearer")) {
    res.status(401).json({
      success: false,
      message: "Invalid authorization. Access Denied😡...!",
    });
  }

  try {
    const token = authToken.split(" ")[1];
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.id;
    req.role = decodeToken.role;
    next();
  } catch (error) {
    if(error.name === "TokenExpiredError"){
      return res.status(401).json({success:false,message:"Token Expired😢...!"})
    }
    res.status(401).json({
      success: false,
      message: `Invalid Token Access: ${error.message}`,
    });
  }
}
