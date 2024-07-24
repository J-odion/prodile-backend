const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Log the incoming request body
  console.log("Login request body:", req.body);
 
 try {
   let user = await User.findOne({ email }).select("+password");

   // Log the retrieved user
   console.log("User retrieved:", user);

   if (!user) {
     return res
       .status(400)
       .json({ msg: "Invalid Email address - User not found" });
   }

   if (!user.isVerified) {
     return res
       .status(400)
       .json({ msg: "Invalid credentials - User has not verified OTP" });
   }

   // Compare the provided password with the hashed password in the database
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     return res
       .status(400)
       .json({ msg: "Invalid credentials - Incorrect password" });
      }
      console.log(isMatch)

   const itisMatch = await bcrypt.compare(password, user.password);
    if (!itisMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(itisMatch)


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
 } catch (err) {
   console.error(err.message);
   res.status(500).send("Server error");
 }
};

