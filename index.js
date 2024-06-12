
const texts = ["Amateur Programmer", "Donate Crypto!", "Give me $2 in crypto and this yours", "Liking toes is weird asf", "Gay son or thot daughter?"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 125; // Typing speed in milliseconds
let deleteSpeed = 75; // Deleting speed in milliseconds
let delayBeforeDelete = 2500; // Delay before deleting in milliseconds
let blinkSpeed = 50; // Blinking speed in milliseconds

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

    // Add a typewriter line when typing
    textToShow += "<span id='typewriter-line'>|</span>"; // Typewriter line

    document.getElementById("typewriter").innerHTML = textToShow;

    if (!isDeleting && charIndex === currentText.length + 1) {
        isDeleting = true;
        setTimeout(typeWriter, delayBeforeDelete); // Delay before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeWriter, 1000); // Delay before typing next text
    } else {
        setTimeout(typeWriter, isDeleting ? deleteSpeed : typingSpeed); // Typing or deleting speed
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



document.addEventListener("DOMContentLoaded", () => {
    let video = document.getElementById('video');
    video.volume = 0.25; // Volume should be a number

    let clickToEnterOverlay = document.getElementById('clickToEnter');
    let main = document.getElementById("Main");

    clickToEnterOverlay.onclick = () => {
        clickToEnterOverlay.style.transition = '0.75s'; // Set transition before changing opacity
        clickToEnterOverlay.style.opacity = '0';
        clickToEnterOverlay.style.zIndex = '-9999';

        main.style.opacity = "1";
        main.style.transition = "0.9s";
        main.style.transform = "translate(-50%, -50%)"; // Use transform for translation

        video.play();
        if (typeof typeWriter === "function") {
            typeWriter();
        }
    };
});



///////////////////////////////////

let copiedAlert = document.getElementById('copiedAlert')

function copyBTC() {
    var copyBTC = document.getElementById("myInput");

    copyBTC.select();
    copyBTC.setSelectionRange(0, 9999); 

    navigator.clipboard.writeText(copyBTC.value);

    copiedAlert.style.marginTop = '10px';
    
    setTimeout(function() {
        copiedAlert.style.marginTop = '-100px';
        copiedAlert.style.transition = '0.25s'
    }, 2000);
};

function copyEth() {
    var copyEth = document.getElementById("inputEthereum");


    copyEth.select();
    copyEth.setSelectionRange(0, 9999);

    navigator.clipboard.writeText(copyEth.value);
    
    copiedAlert.style.marginTop = '10px';
    
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