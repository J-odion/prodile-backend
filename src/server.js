const express = require("express");
const connectDB = require("./utils/database");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors middleware

dotenv.config();
connectDB();

const app = express();

const ALLOWED_ORIGINS = [
  "https://prodile-project.vercel.app",
  "https://app-prodile.vercel.app",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:3001",
];

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ALLOWED_ORIGINS;
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/resources", require("./routes/resources"));
// app.use("/api/individualproductiveunit", require("./routes/productiveUnit"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
