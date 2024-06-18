import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";
import bcrypt from "bcrypt";
// import crypto from "crypto";

// User Registration controller

export async function UserRegistration(req, res, next) {
  const { name, email, password, phone, role } = req.body;

  let SaltRound = 10;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      res
        .status(400)
        .json({ success: false, message: " User already registered..." });
    }

    const salt = await bcrypt.genSalt(SaltRound);

    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    await user.save();
    console.log(user);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// User Login Controller

// const RandomBytes = crypto.randomBytes(32).toString('hex');
// console.log(RandomBytes)
export async function userLoginController(req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found..." });
    }
    console.log(user);
    const IsPasswordValid = await bcrypt.compareSync(
      req.body.password.toString(),
      user.password
    );
    if (!IsPasswordValid) {
      res.status(400).json({ success: false, message: "Invalid Password..." });
    }

    // Generating web token
    const userToken = getJsonWebToken(user);

    // Login user
    const { password, role, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Logged in successfully...",
      data: { ...rest },
      userToken,
      role,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

function getJsonWebToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
}
