const express = require("express");
const AuthRouter = express.Router();
const AuthController = require("../controllers/Auth-Controller.js");

// Public routes
AuthRouter.post("/signup", AuthController.postSignUp);
AuthRouter.post("/login", AuthController.postLogin);
AuthRouter.post("/logout", AuthController.postLogout);

// Example of protected route using JWT
AuthRouter.get(
  "/profile",
  AuthController.verifyJWT,
  (req, res) => {
    res.status(200).json({
      status: true,
      message: "Protected route accessed successfully",
      user: req.user,
    });
  }
);

module.exports = AuthRouter;
