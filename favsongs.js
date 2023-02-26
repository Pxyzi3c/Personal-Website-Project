const musicContainer = document.getElementById('music-container');
const container = document.getElementById('container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progresscontainer');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const backImg = document.getElementById('back-img');

// Song titles
const songs = [ 'Come Inside of My Heart', 'Lost Stars', 'Bubbly', 'Pumped Up Kicks', 'Hard Place', 
                '13', 'ILYSB', 'Super Far', 'Man in the Mirror', 'Never Enough',
                'Girl Almighty', 'Circles', 'Geronimo', 'No Good in Goodbye', 'Tear In My Heart' ];

const singer = [ 'IV of Spades', 'Adam Levine', 'Colbie Caillat', 'Foster The People', 'H.E.R',
                 'LANY', 'LANY', 'LANY', 'Michael Jackson', 'One Direction',
                 'One Direction', 'Post Malone', 'Sheppard', 'The Script', 'Twenty One Pilots' ];

// Keep track of song
let songIndex = 0;

// Load song details into DOM
loadSong(songs[songIndex], singer[songIndex]);

// Update song details
function loadSong(song, singers) {
    title.innerText = song;
    artist.innerText = singers;
    audio.src = `songs/${song}.mp3`;
    if(songIndex === 10) {
        cover.src = `imgs/${song}.jpeg`;
        backImg.src = `imgs/${song}.jpeg`;
    }
    else {
        cover.src = `imgs/${song}.jpg`;
        backImg.src = `imgs/${song}.jpg`;
    }
}

//Play Song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

//Pause Song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector('i.fas').classList.remove("fa-pause");

    audio.pause();
}

// Previous Song
function prevSong() {
    songIndex--;
    
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex], singer[songIndex]);

    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex], singer[songIndex]);

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const{duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event Listener
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
});

// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time$Song Update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener('ended', nextSong);