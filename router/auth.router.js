import express from "express";
import authController from "../controllers/auth.controller.js"
import { accountExistsSingup } from "../middlewares/auth/accountExistsSignup.middleware.js";
import { accountExistsSignin } from "../middlewares/auth/accountExistSignin.middleware.js";
import { accountHasBeenVerified } from "../middlewares/auth/accountHasBeenVerified.middleware.js";
import { passwordIsOk } from "../middlewares/auth/passwordIsOk.middleware.js";
import passport from "../middlewares/passport.js";
import { userSignIn, userSignUp } from "../schema/user.schema.js";
import { validator } from "../middlewares/validator.js";

const {signup, signin, googleSignin, signout, token}= authController;

const router = express.Router();

router.post("/signup", validator(userSignUp), accountExistsSingup, signup)

router.post("/signin", validator(userSignIn), accountExistsSignin, accountHasBeenVerified, passwordIsOk, signin);

router.post(
  "/google",
  googleSignin
);

router.post(
  "/signout",
  signout
);

router.post(
  "/token",
  passport.authenticate("jwt", { session: false }),
  token
);

export default router;