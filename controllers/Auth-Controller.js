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
     const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) return res.status(422).json({ status: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(422).json({ status: false, message: "Incorrect password" });

    // Create JWT (optional: minimal info)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // Send JWT cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // true for HTTPS
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    // Send full user data except password
    const { password: pwd, ...userData } = user;
    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      isLoggedIn: true,
      user: userData
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: false, message: `${err}` });
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
