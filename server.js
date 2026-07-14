const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Подключаем папку public для статики
app.use(express.static(path.join(__dirname, "public")));

// Отдаём index.html при заходе на /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Сервер слушает порт ${PORT}`);
});
