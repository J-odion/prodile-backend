const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Log the incoming request body
  console.log("Login request body:", req.body);

  User.findOne({ email })
    

    try {
      const { email, password } = req.body;
      // Check for User
      const User = await User.findOne({ email }).select("+password");
  
      if (!User) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // if the password matches
      const isMatch = await bcrypt.compare(password, User.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT tokens
      const accessToken = generateAccessToken(User);
      const refreshToken = generateRefreshToken(User);
  
      res.status(200).json({
        message: "Logged in successfully",
        accessToken,
        refreshToken,
        User: {
          UserId: User.UserId,
          email: User.email,
          name: User.name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Error logging in: ${error.message}` });
    }
};
