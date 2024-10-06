// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Middleware để phục vụ tệp HTML
app.use(express.static(path.join(__dirname))); // Thêm dòng này

app.post("/calculate-cv", (req, res) => {
  const items = req.body.items; // Nhận dữ liệu từ client
  let totalCV = 0;

  items.forEach((item) => {
    totalCV += item.crit * 2 + item.critDame; // Tính CV cho từng món
  });

  res.json({ totalCV }); // Trả về tổng CV
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
