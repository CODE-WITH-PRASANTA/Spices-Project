const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./src/config/db");

const coldLeadRoutes =
  require("./src/routes/coldLeadRoutes");

const galleryRoutes =
  require("./src/routes/galleryRoutes");

const testimonialRoutes =
  require("./src/routes/testimonialRoutes");

const menuRoutes =
  require("./src/routes/menuRoutes");

  const cartRoutes = require("./src/routes/cartRoutes");

  const orderRoutes = require("./src/routes/orderRoutes");

// =========================================================
// ENV
// =========================================================

dotenv.config();

// =========================================================
// APP
// =========================================================

const app = express();

// =========================================================
// DATABASE
// =========================================================

connectDB();

// =========================================================
// CORS
// =========================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// =========================================================
// HELMET
// =========================================================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// =========================================================
// BODY PARSER
// =========================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =========================================================
// COOKIE
// =========================================================

app.use(cookieParser());

// =========================================================
// STATIC UPLOADS
// =========================================================
//
// IMPORTANT:
//
// Your existing Multer stores images inside:
//
// backend/src/uploads/
//
// Your Menu controller currently stores Menu images inside:
//
// backend/uploads/menu/
//
// Therefore we serve BOTH locations.
//
// Do NOT remove the first one because your existing
// Gallery / Testimonial / Team / Settings images depend on it.
//
// =========================================================


// =========================================================
// 1. EXISTING BACKEND UPLOADS
// =========================================================

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader(
      "Cross-Origin-Resource-Policy",
      "cross-origin"
    );

    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    next();
  },
  express.static(
    path.join(
      __dirname,
      "src",
      "uploads"
    )
  )
);


// =========================================================
// 2. MENU UPLOADS
// =========================================================
//
// Menu controller stores files in:
//
// backend/uploads/menu/
//
// So this also exposes:
//
// /uploads/menu/filename.webp
//
// =========================================================

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader(
      "Cross-Origin-Resource-Policy",
      "cross-origin"
    );

    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    next();
  },
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);


// =========================================================
// API ROUTES
// =========================================================

app.use(
  "/api/cold-leads",
  coldLeadRoutes
);

app.use(
  "/api/gallery",
  galleryRoutes
);

app.use(
  "/api/testimonials",
  testimonialRoutes
);

app.use(
  "/api/menu",
  menuRoutes
);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);


// =========================================================
// ROOT
// =========================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Healthy Heaven Backend Running",
  });
});


// =========================================================
// 404
// =========================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================

app.use(
  (err, req, res, next) => {
    console.error(
      "GLOBAL ERROR:",
      err
    );

    if (
      err.message ===
      "Not allowed by CORS"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "CORS error: Origin not allowed.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        err.message ||
        "Internal Server Error",
    });
  }
);


// =========================================================
// SERVER
// =========================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});