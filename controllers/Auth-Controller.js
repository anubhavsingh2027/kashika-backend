const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===== SIGNUP =====
exports.postSignUp = async (req, res) => {
  const { userName, email, phone, location, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ userName, email: email.toLowerCase(), phone, location, password: hashedPassword });
    await user.save();

    res.status(200).json({ status: true, message: "User registered successfully!" });
  } catch (err) {
    console.log("Signup error:", err);
    res.status(500).json({ status: false, message: "Server error during signup" });
  }
};

// ===== LOGIN =====
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user)
      return res.status(422).json({ status: false, message: "User not found" });

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(422).json({ status: false, message: "Incorrect password" });

    // 3️⃣ Remove password before encoding
    const { password: _, ...safeUser } = user;

    // 4️⃣ Create full JWT payload
    const tokenPayload = {
      isLogged: true,
      user: safeUser, // all data here
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    // 5️⃣ Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true on HTTPS
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    // 6️⃣ Send response
    res.status(200).json({
      status: true,
      message: "Login successful",
      isLoggedIn: true,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: false, message: `Failed To Login: ${err.message}` });
  }
};

// ===== LOGOUT =====
exports.postLogout = (req, res) => {
  res.clearCookie("token", { domain: "127.0.0.1", sameSite: "none" });
  res.status(200).json({ status: true, message: "Logged out successfully" });
};

exports.verifyJWT = function (req, res, next) {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};
