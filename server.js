const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Сервер работает 🚀");
});

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://online.moysklad.ru/api/remap/1.2/entity/product", {
      headers: {
        Authorization: `Bearer ${process.env.MOYSKLAD_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Ошибка API:", err.message);
    res.status(500).send("Ошибка получения данных");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер слушает порт ${PORT}`);
});
