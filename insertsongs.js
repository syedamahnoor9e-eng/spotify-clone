const mongoose = require("mongoose");
const Song = require("./models/songs");
require("dotenv").config();

async function insertOrUpdateSongs() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const songs = [
            { songId: "song001", title: "Afsos", artist: "Anuv Jain, AP Dhillon", album: "Single", songPath: "/songs/afsos.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e028537cf974af2c408bdd8e1a6" },
            { songId: "song002", title: "Jo Tum Mere Ho", artist: "Anuv Jain", album: "Feel Good with Anuv Jain", songPath: "/songs/jo-tum-mere-ho.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e0272a77d038887cdc425f5ee55" },
            { songId: "song003", title: "Arz Kiya Hai", artist: "Anuv Jain", album: "Single", songPath: "/songs/arz-kiya-hai.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e0225fa2d19b2363a9520a34409" },
            { songId: "song004", title: "Bikhra", artist: "Abdul Hannan & Rovalio", album: "Single", songPath: "/songs/bikhra.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e02778d1df115679f85768bed2f" },
            { songId: "song005", title: "Departure Lane", artist: "Talha Anjum & Umair", album: "My Terrible Mind", songPath: "/songs/departure-lane.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e029c1830c96a63b06c943519e1" },
            { songId: "song006", title: "Ehsaas", artist: "Faheem Abdullah, Duha Shah, Vaibhav Pani, Hyder Dar", album: "Single", songPath: "/songs/ehsaas.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e02e80fd38e3f7025158e40a3ae" },
            { songId: "song007", title: "Husn", artist: "Anuv Jain", album: "Feel Good with Anuv Jain", songPath: "/songs/husn.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e020d3449f333a83a25feb423f8" },
            { songId: "song008", title: "Jhol", artist: "Annural Khalid, Maanu", album: "Single", songPath: "/songs/jhol.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e021344800458a38197bfc721f3" },
            { songId: "song009", title: "Maand", artist: "Bayaan, Hasan Raheem, Rovalio", album: "Safar", songPath: "/songs/maand.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e02e92665d901d9c22e0d617a8e" },
            { songId: "song010", title: "Pal Pal", artist: "Afusic, AliSoomroMusic", album: "Single", songPath: "/songs/pal-pal.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e0285c5968be0d0d9c545241124" },
            { songId: "song011", title: "Regardless", artist: "Asim Azhar", album: "Single", songPath: "/songs/regardless.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e021d0fb29c29b2b78eecd5fd6f" },
            { songId: "song012", title: "Sahiba", artist: "Aditya Rikhari", album: "Single", songPath: "/songs/sahiba.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e020a47bbe7141fdfe0eb2cdba7" },
            { songId: "song013", title: "Samjho Na", artist: "Aditya Rikhari", album: "Single", songPath: "/songs/samjho-na.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e0261589325f2ee1797c6527512" },
            { songId: "song014", title: "Wishes", artist: "Hasan Raheem, Talwiinder, Umair", album: "Maybe, It's Love", songPath: "/songs/wishes.mp3", songImg: "https://i.scdn.co/image/ab67616d00001e0200c7fb9784fa0cbc02f567a6" }
        ];

        for (let song of songs) {
            await Song.updateOne(
                { songId: song.songId },
                { $set: song },
                { upsert: true }
            );
        }

        console.log("Songs inserted/updated successfully.");
    } catch (err) {
        console.error("Error inserting/updating songs:", err);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
}
insertOrUpdateSongs();
