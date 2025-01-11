const songs = [
    { 
        title: "EVIL JORDAN - Playboi Carti", 
        src: "https://easyfiles.cc/2025/1/628626a4-d64f-406d-8293-df887e6561db/EVILJ0RDAN%20POPULAR%20INTRO%20[MOST%20ACCURATE%20VERSION%20by%20OK].mp4" ,
        duration: 130
    },

    { 
        title: "Unkown - Indus Rain", 
        src: "https://easyfiles.cc/2025/1/f65b632b-5a7a-4b21-a5aa-ed45b695309a/Suspect%20(AGB)%20-%20Caught%20Inda%20Rain%20(Official%20Audio)%20%2523Suspiciousactivity.mp4" ,
        duration: 188
    },


    { 
        title: "Unkown - God Said I Was Good", 
        src: "https://easyfiles.cc/2024/8/9cafa851-0405-4009-b639-08ff5e029dc3/youtube_Z4IF2ujq1Xk_1280x720_h264(1).mp4" ,
        duration: 135
    },

    { 
        title: "Armed and dangerous - Jucie Wrld", 
        src: "https://easyfiles.cc/2025/1/bce377e7-d8d2-4dff-9503-3e4c3bd3abb5/Juice%20WRLD%20-%20Armed%20&%20Dangerous%20(Official%20Music%20Video).mp4" ,
        duration: 193
    },

    { 
        title: "Tokyo Drift - Fast And Furious", 
        src: "https://easyfiles.cc/2025/1/4ef57486-9252-4b3f-a5b2-8c98cc71e59e/Tokyo%20Drift%20(Fast%20&%20Furious)%20(From%20%C3%AF%C2%BC%C2%82The%20Fast%20And%20The%20Furious%C3%AF%C2%BC%C2%9A%20Tokyo%20Drift%C3%AF%C2%BC%C2%82%20Soundtrack).mp4" ,
        duration: 111
    },

    { 
        title: "null - Kyle Rich", 
        src: "https://easyfiles.cc/2025/1/008d7f26-785f-4389-812e-00f6e4adef5f/Kyle%20Richh%20x%20Jenn%20Carter%20x%20TaTa%20x%20MCVERTT%20-%20BENT%20(OFFICIAL%20MUSIC%20VIDEO)%20[41].mp4" ,
        duration: 100
    },

];

let currentSongIndex = 0;
let isPlaying = false;

const main = document.getElementById("player")
const videoPlayer = document.getElementById("videoPlayer");
const playPauseButton = document.getElementById("playPause");
const songInfo = document.getElementById("songInfo");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent')
const currentDuration = document.getElementById("current-duration");
const totalDuration = document.getElementById("total-duration");

videoPlayer.addEventListener("timeupdate", () => {
    let value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = value;
    updateSliderBackground(progressBar, value);
    currentDuration.innerText = formatTime(videoPlayer.currentTime);
    totalDuration.innerText = formatTime(songs[currentSongIndex].duration);
});

progressBar.addEventListener('wheel', function (event) {
    event.preventDefault();
});

document.getElementById("prev").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        videoPlayer.play();
    }
});

document.getElementById("next").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        videoPlayer.play();
    }
});

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        videoPlayer.pause();
        playPauseButton.innerHTML = "&#9658;";
    } else {
        videoPlayer.play();
        playPauseButton.innerHTML = "&#10074;&#10074;";
    }
    isPlaying =!isPlaying;
});

videoPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    videoPlayer.play();
});

function updateSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

function loadSong(index) {
    videoPlayer.src = songs[index].src;
    songInfo.innerText = songs[index].title;
    progressBar.value = 0;
    totalDuration.innerText = formatTime(songs[index].duration);
    videoPlayer.load();
    videoPlayer.play();
}

videoPlayer.volume = volumeSlider.value / 100;
volumePercent.innerText = `${volumeSlider.value}%`;
updateVolumeSliderBackground(volumeSlider, volumeSlider.value);

volumeSlider.addEventListener('input', function () {
    videoPlayer.volume = volumeSlider.value / 100;
    volumePercent.innerText = `${volumeSlider.value}%`;
    updateVolumeSliderBackground(volumeSlider, volumeSlider.value);
});

function updateVolumeSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

loadSong(0);
