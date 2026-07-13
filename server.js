const express = require("express");
const axios = require("axios");

const app = express();

const MOYSKLAD_TOKEN = "59c87f01ef0534a116591887c386785972427826";

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://online.moysklad.ru/api/remap/1.2/entity/product",
      {
        headers: {
          Authorization: `Bearer ${MOYSKLAD_TOKEN}`,
          "Accept-Encoding": "gzip"
        }
      }
    );

    // Преобразуем данные в удобный формат
    const products = response.data.rows.map(p => ({
      id: p.id,
      name: p.name,
      price: p.salePrices?.[0]?.value ? p.salePrices[0].value / 100 : 0,
      image: p.image?.meta?.href || ""
    }));

    res.json(products);
  } catch (err) {
    console.error("Ошибка API:", err.message);
    res.status(500).send("Ошибка получения данных");
  }
});

app.listen(3000, () => console.log("Сервер слушает порт 3000"));
