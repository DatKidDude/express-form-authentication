import express from "express";
import User from "../db/Users.mjs";
import { validationResult, checkSchema } from "express-validator";
import { registrationSchema } from "../middleware/registerSchema.mjs";
import { loginSchema } from "../middleware/loginSchema.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/sign-up", checkSchema(registrationSchema), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.redirect(301, "/users");
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/login", checkSchema(loginSchema), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", {
        serverError: errors.array()[0]["msg"],
      });
    }
    return res.json({
      message: "Success",
    });
  } catch (err) {
    res.json({
      msg: err.message,
      success: "false",
    });
  }
});

export default router;
