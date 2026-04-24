# 🎵 Spotify Clone (MERN + Vanilla JS UI)

A modern, responsive Spotify-inspired music player built with **HTML, CSS, and JavaScript**, featuring dynamic song loading, playlist management, and a fully functional audio player.

---

## 🚀 Features

* 🎧 Play, Pause, Next & Previous controls
* 🔍 Real-time song search (by title & artist)
* 📂 Dynamic song loading from backend
* ❤️ Create and manage playlists (LocalStorage)
* ⏱️ Seekbar with live time updates
* 🔊 Volume control slider
* 💾 Resume last played song (saved in browser)
* 📱 Fully responsive design (mobile, tablet, desktop)
* 🍔 Hamburger sidebar for small devices

---

## 🖥️ Tech Stack

**Frontend:**

* HTML5
* CSS3 (Flexbox + Grid + Media Queries)
* Vanilla JavaScript (ES6)

**Backend (for songs API):**

* Node.js / Express (serving `/songs` endpoint)

---

## 📂 Project Structure

```
spotify-clone/
│
├── index.html
├── style.css
├── style2.css
├── script.js
├── images/
├── songs/ (served via backend)
```

---

## ⚙️ How It Works

* Songs are fetched from a backend API (`/songs`)
* Each song contains:

  * `songPath`
  * `songImg`
  * `title`
  * `artist`
* Clicking a song:

  * Loads it into the player
  * Starts playback
* Play button:

  * Toggles play/pause
* Playlist:

  * Stored in `localStorage`
  * Can add songs dynamically

---

## 📱 Responsiveness

The UI is optimized for:

* 📱 Mobile devices (iPhone SE, Android)
* 📲 Tablets (iPad, Surface Pro)
* 💻 Desktop screens

Key responsive techniques used:

* Flexbox layout
* CSS Grid for song cards
* Media queries for adaptive navbar & sidebar

---

## 🎯 Key Learning Outcomes

* DOM manipulation & event handling
* Audio API handling in JavaScript
* Responsive UI design
* State management using LocalStorage
* Debugging real-world UI/UX issues

---

## ⚡ Future Improvements

* 🎶 Add song progress saving (resume from last timestamp)
* 🎨 Improve UI animations (hover, transitions)
* 🔐 User authentication system
* ☁️ Deploy backend + songs to cloud
* 📡 Integrate real music APIs (Spotify API)

---

## 🧑‍💻 Author

**Syeda Mahnoor**
Software Engineer | MERN Stack Developer

---

## 📌 Note

This project is for **educational purposes only** and does not use official Spotify APIs or assets.

---
