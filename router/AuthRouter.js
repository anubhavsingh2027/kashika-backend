const express = require("express");
const AuthRouter = express.Router();
const AuthController = require("../controllers/Auth-Controller.js");

// Public routes
AuthRouter.post("/signup", AuthController.postSignUp);
AuthRouter.post("/login", AuthController.postLogin);
AuthRouter.post("/logout", AuthController.postLogout);
AuthRouter.post("/forgetPassword",AuthController.postForget);
AuthRouter.put("/changeUserType",AuthController.updateUserType);

module.exports = AuthRouter;
