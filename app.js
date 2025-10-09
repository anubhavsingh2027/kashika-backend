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
const packageRouter = require('./router/packageRouter');
const carDetailsRouter = require('./router/carRouter');
const userRouter = require('./router/AuthRouter');
const packageSetRouter = require('./router/packageSetRouter');
const carSetRouter = require('./router/carSetRouter');
const errorController = require("./controllers/error");

// ===== App & DB setup =====
const app = express();
const mongoUrl = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// cookieParser is essential for reading the token from req.cookies
app.use(cookieParser());

// ===== CORS setup (CRITICAL) =====
app.use(cors({
  origin: ["https://anubhavsingh2027.github.io"], 
  credentials: true,
}));



// ===== ROUTES =====
app.use("/kashikaTravel", fetchRouter);
app.use("/kashikaTravel/admin", packageSetRouter);
app.use("/kashikaTravel/admin", carSetRouter);
app.use("/kashikaTravel", userRouter);
app.use("/kashikaTravel", packageRouter);
app.use("/kashikaTravel", carDetailsRouter);

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
    console.log("JWT verify error:", err.message);
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
