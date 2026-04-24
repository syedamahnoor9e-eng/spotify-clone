const express = require("express");
const mongoose = require("mongoose");
const Song = require("./models/songs");
require("dotenv").config();

async function startServer() {
    try {
        let a = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const app = express();
        const port = process.env.PORT || 3000; 
        app.use(express.static("public"));
        app.get("/", (req, res) => {
            res.sendFile('index.html', { root: __dirname })
        });
        app.get("/songs", async (req, res) => {
            try {
                const songs = await Song.find()
                res.json(songs)
            }
            catch (err) {
                res.status(500).json({ error: "Error fetching songs" });
            }
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

startServer();
