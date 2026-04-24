console.log("The program is running.");

let currentSong = new Audio();
let songsList = [];
let currentIndex = 0;

// =============================
// PLAYLIST STORAGE + MODE
// =============================
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let playlistMode = false;

let cardscontainer = document.getElementById("card-container");
let playBtn = document.getElementById("playBtn");
let songTitle = document.getElementById("songTitle");
let currentTimeEl = document.getElementById("currentTime");
let totalTimeEl = document.getElementById("totalTime");

// =============================
// FETCH SONGS
// =============================
async function fetchSongs() {
    let res = await fetch("https://spotify-clone-backend-8uuy.onrender.com/songs");
    let songs = await res.json();

    songsList = songs;
    renderSongs(songsList);
}

// =============================
// RENDER SONGS
// =============================
function renderSongs(list) {
    cardscontainer.innerHTML = "";

    list.forEach((song, index) => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${song.songImg}">
            <ul>
                <li>${song.title}</li>
                <li>${song.artist}</li>
            </ul>
        `;

        card.addEventListener("click", () => {

            // 👉 PLAYLIST MODE
            if (playlistMode) {
                if (!playlist.find(s => s.songId === song.songId)) {
                    playlist.push(song);
                    localStorage.setItem("playlist", JSON.stringify(playlist));
                    renderPlaylist();
                    alert(`${song.title} added to playlist`);
                }

                playlistMode = false;

                return;
            }

            // 👉 NORMAL PLAY
            currentIndex = index;
            loadSong(song);
            currentSong.play();
            playBtn.src = "images/pausebutton.svg";
        });

        cardscontainer.appendChild(card);
    });
}

fetchSongs();

// =============================
// LOAD SONG
// =============================
function loadSong(song) {
    currentSong.src = song.songPath;

    songTitle.textContent = `${song.title} - ${song.artist}`;
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent = "0:00";

    localStorage.setItem("lastSong", JSON.stringify(song));

    currentSong.addEventListener("loadedmetadata", () => {
        totalTimeEl.textContent = formatTime(currentSong.duration);
    });

    playBtn.src = "images/playbutton.svg";
}

// =============================
// PLAY / PAUSE
// =============================
window.addEventListener("load", () => {
    playBtn.src = "images/playbutton.svg";
});
playBtn.addEventListener("click", () => {
    if (!currentSong.src) {
        songTitle.textContent = "Select a song to play";
        return;
    }
    if (currentSong.paused) {
        currentSong.play();
        playBtn.src = "images/pausebutton.svg";
    } else {
        currentSong.pause();
        playBtn.src = "images/playbutton.svg";
    }
});


// =============================
// NEXT / PREVIOUS
// =============================
document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songsList.length;
    loadSong(songsList[currentIndex]);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songsList.length) % songsList.length;
    loadSong(songsList[currentIndex]);
});

// AUTO NEXT
currentSong.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % songsList.length;
    loadSong(songsList[currentIndex]);
});

// =============================
// SEEKBAR
// =============================
let seekbar = document.querySelector(".seekbar");
let circle = document.querySelector(".circle");
let isDragging = false;

currentSong.addEventListener("timeupdate", () => {
    if (!isDragging && currentSong.duration) {
        let percent = (currentSong.currentTime / currentSong.duration) * 100;
        circle.style.left = percent + "%";
        currentTimeEl.textContent = formatTime(currentSong.currentTime);
    }
});

seekbar.addEventListener("click", (e) => {
    let percent = e.offsetX / seekbar.offsetWidth;
    currentSong.currentTime = percent * currentSong.duration;
});

// =============================
// TIME FORMAT
// =============================
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// =============================
// VOLUME CONTROL
// =============================
let volumeControl = document.getElementById("volumeControl");
let volumeDot = document.getElementById("volumeDot");

volumeControl.addEventListener("click", (e) => {
    let rect = volumeControl.getBoundingClientRect();
    let percentage = (e.clientX - rect.left) / rect.width;

    currentSong.volume = Math.max(0, Math.min(1, percentage));
    volumeDot.style.left = `${percentage * 100}%`;
});

// =============================
// SEARCH
// =============================
let searchInput = document.querySelector(".search-bar input");

searchInput.addEventListener("input", () => {
    let query = searchInput.value.toLowerCase();

    let filtered = songsList.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );

    renderSongs(filtered);
});

// =============================
// PLAYLIST BUTTON (IMPORTANT)
// =============================
let createBtn = document.getElementById("createPlaylistBtn");

if (createBtn) {
    createBtn.addEventListener("click", () => {
        playlist = [];
        localStorage.setItem("playlist", JSON.stringify(playlist));

        playlistMode = true;

        alert("Playlist created! Now click songs to add.");
    });
}

// =============================
// RENDER PLAYLIST
// =============================
function renderPlaylist() {
    let container = document.getElementById("playlistContainer");

    if (!container) return;

    container.innerHTML = "";

    if (playlist.length === 0) {
        return null;
    }

    playlist.forEach((song, index) => {
        let li = document.createElement("li");
        li.classList.add("playlist-item");

        li.innerHTML = `
            <img src="${song.songImg}" class="playlist-img">
            <div class="playlist-info">
                <div class="playlist-title">${song.title}</div>
                <div class="playlist-artist">${song.artist}</div>
            </div>
        `;

        li.addEventListener("click", () => {
            loadSong(song);
        });

        container.appendChild(li);
    });
}

// =============================
// LOAD LAST SONG + PLAYLIST
// =============================
window.addEventListener("load", () => {
    renderPlaylist();

    let last = localStorage.getItem("lastSong");
    if (last) {
        loadSong(JSON.parse(last));
    }
});

document.addEventListener('click', (e) => {
    const hamburger = e.target.closest('.hamburger');
    const leftSidebar = document.querySelector(".left");

    // 1. If clicking the hamburger, toggle the 'active' class
    if (hamburger) {
        leftSidebar.classList.toggle("active");
        console.log("Sidebar toggled");
    }
    // 2. If the sidebar is open and the user clicks OUTSIDE the sidebar and hamburger
    else if (leftSidebar.classList.contains("active") && !e.target.closest(".left")) {
        leftSidebar.classList.remove("active");
        console.log("Sidebar closed by clicking outside");
    }
});