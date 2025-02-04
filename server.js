const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = "7179171006:AAE15RhrvD0Yw1x6F96XYAeYaZ9EuNGFqZI";
const CHAT_ID = "7931551389:AAFZGONaZlITYSa-RnaS3GXi7AKGOge9U_E";

app.post("/log-user", async (req, res) => {
    const { id, username, first_name, last_name } = req.body;

    const logData = `${new Date().toISOString()} - ID: ${id}, Username: ${username || "Без ника"}, Name: ${first_name} ${last_name || ""}\n`;
    fs.appendFileSync("users.log", logData);

    const message = `?? *Новый вход в мини-апп*:\n?? ID: ${id}\n?? Username: @${username || "Нет"}\n?? Имя: ${first_name} ${last_name || ""}`;
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
    });

});

