// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios"); // Thêm axios

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

// Thêm route để lấy thông tin từ UID
app.get("/get-user-info/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const response = await axios.get(`https://enka.network/hsr/${uid}/`);
    res.json(response.data); // Trả về dữ liệu nhận được
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy thông tin." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
