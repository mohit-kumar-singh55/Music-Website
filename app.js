console.log("Welcome to Spotify!");
// Initialize the variable
let songIndex = 0;

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "Summer Time", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Dark seeks light", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Here", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Natsu no Owari", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Rascal", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rascal Too", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Renai Circulation", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Sparkle", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Sugar", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Tabun", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

let audioElement = new Audio('songs/1.mp3');
// audioElement.play();

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();

        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");

        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Calculating song progress in parcentage
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        songIndex = parseInt(e.target.id);

        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        masterSongName.innerText = songs[songIndex].songName;

        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    masterSongName.innerText = songs[songIndex].songName;

    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    masterSongName.innerText = songs[songIndex].songName;

    gif.style.opacity = 1;
})