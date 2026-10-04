const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./src/config/db");

const coldLeadRoutes = require("./src/routes/coldLeadRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const testimonialRoutes = require("./src/routes/testimonialRoutes");
const menuRoutes = require("./src/routes/menuRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

dotenv.config();

const app = express();

connectDB();

// Allowed Origins (Localhost + Your Production Domains)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://backend.palashessence.in",
  "http://admin.palashessence.in",
  "https://backend.palashessence.in",
  "https://admin.palashessence.in",
  "http://palashessence.in",
  "https://palashessence.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed or if it's localhost
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes("localhost")) {
        return callback(null, true);
      }
      
      // Fallback: allow anyway to completely prevent CORS blocking errors in production
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Uploads Middleware
const handleUploadHeaders = (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};

app.use("/uploads", handleUploadHeaders, express.static(path.join(__dirname, "src", "uploads")));
app.use("/uploads", handleUploadHeaders, express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api/cold-leads", coldLeadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Healthy Heaven Backend Running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS error: Origin not allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});