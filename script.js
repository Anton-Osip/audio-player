const playPauseButton = document.querySelector(".play_pause");
const backgroundImageElement = document.querySelector(".backgroundImage");
const thumbnailElement = document.querySelector(".thumbnail");
const artistElement = document.querySelector(".song-artist");
const titleElement = document.querySelector(".song-title");
const nextSongButton = document.querySelector(".forward");
const prevSongButton = document.querySelector(".backward");
const audio = document.querySelector('.song');
const progress = document.querySelector('.progressbar__input');
const currentTimeDisplay = document.querySelector('.currentTime');
const durationDisplay = document.querySelector('.durationTime');
const dataSongs = [
    {
        srcAudio: './assets/audio/beyonce.mp3',
        srcBanner: './assets/img/lemonade.png',
        artist: 'Beyonce',
        title: 'Don\'t Hurt Yourself'
    },
    {
        srcAudio: './assets/audio/dontstartnow.mp3',
        srcBanner: './assets/img/dontstartnow.png',
        artist: 'Dua Lipa',
        title: 'Don\'t Start Now'
    }
]

let currentSong = 0
let isPaused = true;

const switchSong = () => {
    audio.src = dataSongs[currentSong].srcAudio;
    backgroundImageElement.src = dataSongs[currentSong].srcBanner;
    thumbnailElement.src = dataSongs[currentSong].srcBanner;
    artistElement.innerHTML = dataSongs[currentSong].artist;
    titleElement.innerHTML = dataSongs[currentSong].title;
    if (isPaused) {
        audioPaused()
    } else {
        audioPlay()
    }
}

const nextSong = () => {
    if (currentSong === dataSongs.length - 1) {
        currentSong = 0
    } else {
        currentSong++
    }
    switchSong()
}
const prevSong = () => {
    if (currentSong === 0) {
        currentSong = dataSongs.length - 1
    } else {
        currentSong--
    }
    switchSong()
}
const audioPlay = () => {
    isPaused = false
    audio.play();
    playPauseButton.classList.remove("play");
    playPauseButton.classList.add("pause");
    thumbnailElement.classList.add("play");
}
const audioPaused = () => {
    isPaused = true
    audio.pause();
    playPauseButton.classList.add("play");
    playPauseButton.classList.remove("pause");
    thumbnailElement.classList.remove("play");
}

switchSong()


playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audioPlay()
    } else {
        audioPaused()
    }
});

nextSongButton.addEventListener('click', nextSong)
prevSongButton.addEventListener('click', prevSong)

audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    if (isNaN(durationSeconds)) {
        durationMinutes = 0
        durationSeconds = 0
    }
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});
