const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// API endpoint to serve products.json
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "products.json"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
