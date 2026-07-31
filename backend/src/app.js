require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/auth.middleware");
const upload = require("./middleware/upload.middleware");
const documentRoutes = require("./routes/document.routes");
const authRoutes = require("./routes/auth.routes");
const skuRoutes = require("./routes/sku.routes");
const matchRoutes = require("./routes/match.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const auditRoutes = require("./routes/audit.routes");
const summaryRoutes = require("./routes/summary.routes");
const exceptionRoutes = require("./routes/exception.routes");

const app = express();

// ==============================
// Middlewares
// ==============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static("src/uploads"));
app.use("/documents", authMiddleware, documentRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/exceptions", exceptionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Three Way Match Engine API Running",
  });
});

app.use("/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit", auditRoutes);

app.use("/masters/sku", authMiddleware, skuRoutes);

// ==============================
// Database Test Route
// ==============================

const SkuMaster = require("./models/skuMaster.model");

app.get("/test-db", async (req, res) => {
  try {
    const count = await SkuMaster.countDocuments();

    res.json({
      success: true,
      message: "MongoDB Connected Successfully",
      totalSku: count,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Not Found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
