// ===== Core modules =====
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

// ===== External modules =====
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// ===== Local modules =====
const fetchRouter = require('./router/fetchdata');
const packageRouter = require('./router/bookRouter');
const authRouter = require('./router/AuthRouter');
const carSetRouter = require('./router/adminResourcesSet');


// ===== App & DB setup =====
const app = express();
const mongoUrl = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ===== CORS setup (CRITICAL) =====
app.use(cors({
  origin: ["https://anubhavsingh2027.github.io"],
  credentials: true,
}));

//check unauthorized access
app.use("/kashikaTravel/admin",async (req, res, next) => {
  try {
    const token = req.cookies.token;


    if (!token) {
      return res.status(401).json({
        access: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user role
    if (decoded.user.userType !== "admin") {
      return res.status(403).json({
        access: false,
        message: "Forbidden: Admin access only",
      });
    }

    // Attach user info to request (optional but useful)
    req.user = decoded.user;

    // Move to next middleware or route
    next();

  } catch (error) {
    return res.status(401).json({
      access: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
}

 );

// ===== ROUTES =====
app.use("/kashikaTravel", fetchRouter);
app.use("/kashikaTravel/admin", carSetRouter);
app.use("/kashikaTravel", authRouter);
app.use("/kashikaTravel", packageRouter);

// ===== Session (JWT) check =====
app.get("/kashikaTravel/session-user", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false, user: { userType: "guest" } });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({
      loggedIn: decoded.isLogged,
      user: decoded.user, // full user data
    });
  } catch (err) {
    return res.json({ loggedIn: false, user: { userType: "guest" } });
  }
});


// ===== Start server =====
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("<======== MongoDB Connected Successfully =======>");
    app.listen(port, () => {
      console.log(`Server Running At http://localhost:${port}`);
    });
  })
  .catch(err => console.log("Error connecting MongoDB", err));
