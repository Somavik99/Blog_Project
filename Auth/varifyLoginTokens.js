import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";

/* Authenticating The token */

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
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token Expired😢...!" });
    }
    res.status(401).json({
      success: false,
      message: `Invalid Token Access: ${error.message}`,
    });
  }
}

// Restricting if not loggedOIn or signedIn

export const restrictNonUser = (role) => async (req, res, next) => {
  try {
    const userId = role.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: true, message: "User not found...!" });
    }

    const userRole = user.role;
    if (userRole === "user" || role.includes("user")) {
      next();
    } else if (userRole === "admin" || role.includes("admin")) {
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "User not authorized...!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Internal server error: ${error.message}`,
      });
  }
};
