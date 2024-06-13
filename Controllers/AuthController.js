import User from "../Models/UserSchema";
import bcrypt from "bcrypt";

// User Registration controller

export async function UserRegistration(req, res, next) {
  const { name, email, password, phone, role } = req.body;

  let SaltRound = 10;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res
        .status(400)
        .json({ success: false, message: " User already registered..." });
    }

    const Salt_Password = await bcrypt.genSalt(SaltRound);

    const HashedPassword = await bcrypt.hash(password, Salt_Password);

    user = new User({
      name,
      email,
      password: HashedPassword,
      phone,
      role,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// User Login Controller



