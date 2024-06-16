const texts = ["Amateur Programmer", "Donate Crypto!", "Give me $2 in crypto and this yours", "Liking toes is weird asf", "Gay son or thot daughter?"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 125;
let deleteSpeed = 75;
let delayBeforeDelete = 2500;
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
        setTimeout(typeWriter, isDeleting? deleteSpeed : typingSpeed);
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



document.addEventListener('DOMContentLoaded', function() {
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
            if (currentIndex === 0) {
                forward = true;
                setTimeout(typeWriterEffect, 500); // Pause at empty title
                return;
            }
        }
        setTimeout(typeWriterEffect, 333); // Adjust typing speed here
    }
    typeWriterEffect();
});



document.addEventListener("DOMContentLoaded", () => {
    let video = document.getElementById('video');
    video.volume = 0.25;

    let clickToEnterOverlay = document.getElementById('clickToEnter');
    let main = document.getElementById("Main");

    clickToEnterOverlay.onclick = () => {
        clickToEnterOverlay.style.transition = '0.75s';
        clickToEnterOverlay.style.opacity = '0';
        clickToEnterOverlay.style.zIndex = '-9999';
        main.style.opacity = "1";
        main.style.transition = "0.9s";
        main.style.transform = "translate(-50%, -50%)";

        video.play();
        if (typeof typeWriter === "function") {
            typeWriter();
        }
    };
});


let copiedAlert = document.getElementById('copiedAlert')

function copyBTC() {
    var copyBTC = document.getElementById("myInput");

    copyBTC.select();
    copyBTC.setSelectionRange(0, 9999); 

    navigator.clipboard.writeText(copyBTC.value);
    
    setTimeout(function() {
        copiedAlert.style.opacity = '-100px';
        copiedAlert.style.transition = '0.25s'
    }, 2000);
};

function copyEth() {
    var copyEth = document.getElementById("inputEthereum");

    copyEth.select();
    copyEth.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(copyEth.value);
    
    
    setTimeout(function() {
        copiedAlert.style.marginTop = '-100px';
        copiedAlert.style.transition = '0.25s'
    }, 2000);
};

function copyLTC() {
    var copyLTC = document.getElementById("inputLitecoin");

    copyLTC.select();
    copyLTC.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(copyLTC.value);

    copiedAlert.style.marginTop = '10px';
    
    setTimeout(function() {
        copiedAlert.style.marginTop = '-100px';
        copiedAlert.style.transition = '0.25s'
    }, 2000);
};

function copyXMR() {
    var copyXMR = document.getElementById("inputMonero");

    copyXMR.select();
    copyXMR.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(copyXMR.value);

    copiedAlert.style.marginTop = '10px';
    
    setTimeout(function() {
        copiedAlert.style.marginTop = '-100px';
        copiedAlert.style.transition = '0.25s'
    }, 2000);
};


document.addEventListener('DOMContentLoaded', function() {
    const imgElement = document.getElementById('updating-image');
    const baseImageUrl = "https://lanyard.cnrad.dev/api/1201415921802170388";

    function updateImage() {
        const timestamp = new Date().getTime();
        imgElement.src = `${baseImageUrl}?t=${timestamp}`;
    }

    setInterval(updateImage, 500);
});