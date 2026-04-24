const mongoose = require("mongoose");

const SongsSchema = new mongoose.Schema({
    songId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    artist: { type: String, required: true},
    album: { type: String },
    songPath:{type:String, required:true},
    songImg:{type:String}
});

module.exports = mongoose.model('Songs', SongsSchema);