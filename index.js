// Typewriter Effect
const texts = ["Amateur Programmer", "Donate Crypto!"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 75;
let deleteSpeed = 40;
let delayBeforeDelete = 1000;
let blinkSpeed = 50;

function typeWriter() {
    const currentText = texts[textIndex];
    let textToShow = '';

    if (isDeleting) {
        textToShow = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textToShow = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    textToShow += "<span id='typewriter-line'>|</span>";

    document.getElementById("typewriter").innerHTML = textToShow;

    if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        setTimeout(typeWriter, delayBeforeDelete);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, 1000);
    } else {
        setTimeout(typeWriter, isDeleting ? deleteSpeed : typingSpeed);
    }
}

let opacity = 0;
let direction = 1;

setInterval(() => {
    const typewriterLine = document.getElementById("typewriter-line");
    if (typewriterLine) {
        typewriterLine.style.opacity = opacity;
        opacity += 0.1 * direction;
        if (opacity <= 0 || opacity >= 1) {
            direction *= -1;
        }
    }
}, 50);

// Music Player
const songs = [
    { title: "Lil Peep & Yung Bruh - White Tee", src: "https://easyfiles.cc/2024/7/2e7c25e3-a229-4d64-870b-361d6dd91d07/lil%20peep%20w_%20yung%20bruh%20-%20white%20tee-fudsUhWAG_o.mp4" },
    { title: "[Facy] - iDog/iHome", src: "https://easyfiles.cc/2024/7/85b48d62-e139-4988-a5f6-8b31b972f3f6/facy%20idog%20ihome.mp4" },
    { title: "Immortal Technique - Dance With The Devil", src: "https://easyfiles.cc/2024/7/e4531233-e32f-4ba2-9577-9f0f29deb10a/Dance%20With%20The%20Devil%20-%20Immortal%20Technique-qggxTtnKTMo.mp4"},
    { title: "Laker - Let's Go (Percs in the Bathroom)", src: "https://easyfiles.cc/2024/7/a8555e89-a681-47ca-a168-2e84f9cf7876/percs.mp4"},
    { title: "Aceii - Pedal", src: "https://easyfiles.cc/2024/7/a7ea411d-e8b0-4615-a12f-31e3fe30468d/aceii%20pedal.mp4"},
    { title: "Laker - Kyoto", src: "https://easyfiles.cc/2024/7/3437d147-6864-446f-90cc-e9b71b805b01/laker%20kyoto.mp4"},
    { title: "Laker & Joeyy - AFFORD IT", src: "https://easyfiles.cc/2024/7/c88dd007-b359-4c41-9ea4-565ca7f3cdde/laker%20afford%20it.mp4"},
    { title: "woody - Station", src: "https://easyfiles.cc/2024/7/d62a48a1-33ab-496f-9e9a-e228b775d1a5/woody%20station.mp4"},
    { title: "Henry Mosto - Frog", src: "https://easyfiles.cc/2024/7/a7f57be2-d04a-44df-85ae-bf03647c99d9/frog.mp4"},
];

let currentSongIndex = 0;
let isPlaying = false;

const videoPlayer = document.getElementById("videoPlayer");
const playPauseButton = document.getElementById("playPause");
const songInfo = document.getElementById("songInfo");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent')

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
    isPlaying = !isPlaying;
});

videoPlayer.addEventListener("timeupdate", () => {
    let value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = value;
    updateSliderBackground(progressBar, value);
});

progressBar.addEventListener("input", () => {
    let value = progressBar.value;
    videoPlayer.currentTime = (value / 100) * videoPlayer.duration;
    updateSliderBackground(progressBar, value);
});

// Listen for the ended event on the videoPlayer
videoPlayer.addEventListener("ended", () => {
    // Automatically play the next song
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    videoPlayer.play(); // Start playing the next song
});

function updateSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

function loadSong(index) {
    videoPlayer.src = songs[index].src;
    songInfo.innerText = songs[index].title;
    progressBar.value = 0;
}

loadSong(currentSongIndex);

// Initialize Typewriter and Play Music on Click
document.addEventListener('DOMContentLoaded', function () {
    const fullTitle = "@zyqunix";
    let currentIndex = 0;
    let forward = true;

    function typeWriterEffect() {
        if (forward) {
            document.title = fullTitle.substring(0, currentIndex + 1);
            currentIndex++;
            if (currentIndex === fullTitle.length) {
                forward = false;
                setTimeout(typeWriterEffect, 1500); // Pause at full title
                return;
            }
        } else {
            document.title = fullTitle.substring(0, currentIndex - 1);
            currentIndex--;
            if (currentIndex === 1) {
                forward = true;
                setTimeout(typeWriterEffect, 500); // Pause at empty title
                return;
            }
        }
        setTimeout(typeWriterEffect, 333); // Adjust typing speed here
    }
    typeWriterEffect();
});

let clickToEnterOverlay = document.getElementById('clickToEnter');

clickToEnterOverlay.onclick = () => {
    clickToEnterOverlay.style.transition = '0.75s';
    clickToEnterOverlay.style.opacity = '0';
    clickToEnterOverlay.style.zIndex = '-9999';

    videoPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;";
    isPlaying = !isPlaying;
    typeWriter();
};

// Set initial volume and update volume slider background
videoPlayer.volume = volumeSlider.value / 100;
volumePercent.innerText = `${volumeSlider.value}%`;
updateVolumeSliderBackground(volumeSlider, volumeSlider.value);

// Volume control event listener
volumeSlider.addEventListener('input', function () {
    videoPlayer.volume = volumeSlider.value / 100;
    volumePercent.innerText = `${volumeSlider.value}%`;
    updateVolumeSliderBackground(volumeSlider, volumeSlider.value);
});

// Function to update volume slider background based on value
function updateVolumeSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enter").addEventListener("click", () => {});
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && ["s", "c", "e", "u"].includes(e.key.toLowerCase())) {
            e.preventDefault();
            window.location.href = "";
        }
    });
    document.addEventListener("contextmenu", (e) => e.preventDefault());
});