const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Log the incoming request body
  console.log("Login request body:", req.body);

  User.findOne({ email })
    .then(user => {
      // Log the retrieved user
      console.log("User retrieved:", user);

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials - User not found" });
      }

      if (!user.isVerified) {
        return res.status(400).json({ msg: "Invalid credentials - User not verified" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          // Log the password comparison result
          console.log("Password match result:", isMatch);

          if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials - Incorrect password" });
          }

          const payload = {
            user: {
              id: user.id,
            },
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        })
        .catch(err => {
          console.error(err.message);
          res.status(500).send("Server error");
        });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send("Server error");
    });
};
