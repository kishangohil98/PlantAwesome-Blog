const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  console.log("Auth, get called");
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login route
router.post(
  "/",
  [
    check("email", "Please includ valid Email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("Login, Auth post called");
    try {
      // let trimEmail = email.trim();
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid, Email not Exists",
            },
          ],
        });
      }

      if (password === user.password) {
        console.log("Password, match Auth,post");

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecretkey"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
          }
        );
      } else {
        console.log("Password not match, match Auth,post");

        return res.status(400).json({
          errors: [
            {
              msg: "Invlid Credentials",
            },
          ],
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
