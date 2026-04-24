const express = require("express");
const mongoose = require("mongoose");
const Song = require("./models/songs");
const cors = require("cors");
require("dotenv").config();

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const app = express();
        const port = process.env.PORT || 3000;

        app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type"]
        }));

        app.options("*", cors()); 

        app.use(express.static("public"));
        app.use("/songs", express.static("public/songs"));

        app.get("/", (req, res) => {
            res.sendFile('index.html', { root: __dirname })
        });

        app.get("/songs", async (req, res) => {
            try {
                const songs = await Song.find();
                res.json(songs);
            } catch (err) {
                res.status(500).json({ error: "Error fetching songs" });
            }
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

startServer();