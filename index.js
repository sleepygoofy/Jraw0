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
    { title: "Immortal Technique - Dance With The Devil", src: "https://easyfiles.cc/2024/7/e4531233-e32f-4ba2-9577-9f0f29deb10a/Dance%20With%20The%20Devil%20-%20Immortal%20Technique-qggxTtnKTMo.mp4" },
    { title: "Laker - Let's Go (Percs in the Bathroom)", src: "https://easyfiles.cc/2024/7/a8555e89-a681-47ca-a168-2e84f9cf7876/percs.mp4" },
    { title: "Aceii - Pedal", src: "https://easyfiles.cc/2024/7/a7ea411d-e8b0-4615-a12f-31e3fe30468d/aceii%20pedal.mp4" },
    { title: "Laker - Kyoto", src: "https://easyfiles.cc/2024/7/3437d147-6864-446f-90cc-e9b71b805b01/laker%20kyoto.mp4" },
    { title: "Laker & Joeyy - AFFORD IT", src: "https://easyfiles.cc/2024/7/c88dd007-b359-4c41-9ea4-565ca7f3cdde/laker%20afford%20it.mp4" },
    { title: "woody - Station", src: "https://easyfiles.cc/2024/7/d62a48a1-33ab-496f-9e9a-e228b775d1a5/woody%20station.mp4" },
    { title: "Henry Mosto - Frog", src: "https://easyfiles.cc/2024/7/a7f57be2-d04a-44df-85ae-bf03647c99d9/frog.mp4" },
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
    document.getElementById("enter").addEventListener("click", () => { });
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && ["s", "c", "e", "u"].includes(e.key.toLowerCase())) {
            e.preventDefault();
            window.location.href = "";
        }
    });
    document.addEventListener("contextmenu", (e) => e.preventDefault());
});



// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
    const isReducedMotion =
        window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
        window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (isReducedMotion) return;

    const nekoEl = document.createElement("div");

    let nekoPosX = 32;
    let nekoPosY = 32;

    let mousePosX = 0;
    let mousePosY = 0;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;

    const nekoSpeed = 10;
    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratchSelf: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
        ],
        scratchWallN: [
            [0, 0],
            [0, -1],
        ],
        scratchWallS: [
            [-7, -1],
            [-6, -2],
        ],
        scratchWallE: [
            [-2, -2],
            [-2, -3],
        ],
        scratchWallW: [
            [-4, 0],
            [-4, -1],
        ],
        tired: [[-3, -2]],
        sleeping: [
            [-2, 0],
            [-2, -1],
        ],
        N: [
            [-1, -2],
            [-1, -3],
        ],
        NE: [
            [0, -2],
            [0, -3],
        ],
        E: [
            [-3, 0],
            [-3, -1],
        ],
        SE: [
            [-5, -1],
            [-5, -2],
        ],
        S: [
            [-6, -3],
            [-7, -2],
        ],
        SW: [
            [-5, -3],
            [-6, -1],
        ],
        W: [
            [-4, -2],
            [-4, -3],
        ],
        NW: [
            [-1, 0],
            [-1, -1],
        ],
    };

    function init() {
        nekoEl.id = "oneko";
        nekoEl.ariaHidden = true;
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.position = "fixed";
        nekoEl.style.pointerEvents = "none";
        nekoEl.style.imageRendering = "pixelated";
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.zIndex = Number.MAX_VALUE;

        let nekoFile = "./oneko.gif"
        const curScript = document.currentScript
        if (curScript && curScript.dataset.cat) {
            nekoFile = curScript.dataset.cat
        }
        nekoEl.style.backgroundImage = `url(${nekoFile})`;

        document.body.appendChild(nekoEl);

        document.addEventListener("mousemove", function (event) {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
        });

        window.requestAnimationFrame(onAnimationFrame);
    }

    let lastFrameTimestamp;

    function onAnimationFrame(timestamp) {
        // Stops execution if the neko element is removed from DOM
        if (!nekoEl.isConnected) {
            return;
        }
        if (!lastFrameTimestamp) {
            lastFrameTimestamp = timestamp;
        }
        if (timestamp - lastFrameTimestamp > 100) {
            lastFrameTimestamp = timestamp
            frame()
        }
        window.requestAnimationFrame(onAnimationFrame);
    }

    function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        // every ~ 20 seconds
        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
            if (nekoPosX < 32) {
                avalibleIdleAnimations.push("scratchWallW");
            }
            if (nekoPosY < 32) {
                avalibleIdleAnimations.push("scratchWallN");
            }
            if (nekoPosX > window.innerWidth - 32) {
                avalibleIdleAnimations.push("scratchWallE");
            }
            if (nekoPosY > window.innerHeight - 32) {
                avalibleIdleAnimations.push("scratchWallS");
            }
            idleAnimation =
                avalibleIdleAnimations[
                Math.floor(Math.random() * avalibleIdleAnimations.length)
                ];
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                }
                break;
            case "scratchWallN":
            case "scratchWallS":
            case "scratchWallE":
            case "scratchWallW":
            case "scratchSelf":
                setSprite(idleAnimation, idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            // count down after being alerted before moving
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
        }

        let direction;
        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    init();
})();
