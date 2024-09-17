// this da snowflake effect you see wit da mouse 

var snowStorm = function (g, f) {
    function k(a, d) {
      if (isNaN(d)) {
        d = 0;
      }
      return Math.random() * a + d;
    }
    function x() {
      g.setTimeout(function () {
        a.start(true);
      }, 20);
      a.events.remove(m ? f : g, "mousemove", x);
    }
    function y() {
      if (!a.excludeMobile || !D) {
        x();
      }
      a.events.remove(g, "load", y);
    }
    this.excludeMobile = this.autoStart = true;
    this.flakesMax = 128;
    this.flakesMaxActive = 64;
    this.animationInterval = 33;
    this.useGPU = true;
    this.className = null;
    this.excludeMobile = true;
    this.flakeBottom = null;
    this.followMouse = true;
    this.snowColor = "#fff";
    this.snowCharacter = "&bull;";
    this.snowStick = true;
    this.targetElement = null;
    this.useMeltEffect = true;
    this.usePixelPosition = this.usePositionFixed = this.useTwinkleEffect = false;
    this.freezeOnBlur = true;
    this.flakeRightOffset = this.flakeLeftOffset = 0;
    this.flakeHeight = this.flakeWidth = 8;
    this.vMaxX = 5;
    this.vMaxY = 4;
    this.zIndex = 0;
    var a = this;
    var q;
    var m = navigator.userAgent.match(/msie/i);
    var E = navigator.userAgent.match(/msie 6/i);
    var D = navigator.userAgent.match(/mobile|opera m(ob|in)/i);
    var r = m && "BackCompat" === f.compatMode || E;
    var h = null;
    var n = null;
    var l = null;
    var p = null;
    var s = null;
    var z = null;
    var A = null;
    var v = 1;
    var t = false;
    var w = false;
    var u;
    a: {
      try {
        f.createElement("div").style.opacity = "0.5";
      } catch (F) {
        u = false;
        break a;
      }
      u = true;
    }
    var B = false;
    var C = f.createDocumentFragment();
    q = function () {
      function c(b) {
        g.setTimeout(b, 1E3 / (a.animationInterval || 20));
      }
      var e;
      var b = g.requestAnimationFrame || g.webkitRequestAnimationFrame || g.mozRequestAnimationFrame || g.oRequestAnimationFrame || g.msRequestAnimationFrame || c;
      e = b ? function () {
        return b.apply(g, arguments);
      } : null;
      var h;
      h = f.createElement("div");
      e = {
        transform: {
          ie: undefined !== h.style[a] ? "-ms-transform" : null,
          moz: undefined !== h.style[a] ? "MozTransform" : null,
          opera: undefined !== h.style[a] ? "OTransform" : null,
          webkit: undefined !== h.style[a] ? "webkitTransform" : null,
          w3: undefined !== h.style[a] ? "transform" : null,
          prop: null
        },
        getAnimationFrame: e
      };
      e.transform.prop = e.transform.w3 || e.transform.moz || e.transform.webkit || e.transform.ie || e.transform.opera;
      h = null;
      return e;
    }();
    this.timer = null;
    this.flakes = [];
    this.active = this.disabled = false;
    this.meltFrameCount = 20;
    this.meltFrames = [];
    this.setXY = function (c, d, e) {
      if (!c) {
        return false;
      }
      if (a.usePixelPosition || w) {
        c.style.left = d - a.flakeWidth + "px";
        c.style.top = e - a.flakeHeight + "px";
      } else if (r) {
        c.style.right = 100 - 100 * (d / h) + "%";
        c.style.top = Math.min(e, s - a.flakeHeight) + "px";
      } else if (a.flakeBottom) {
        c.style.right = 100 - 100 * (d / h) + "%";
        c.style.top = Math.min(e, s - a.flakeHeight) + "px";
      } else {
        c.style.right = 100 - 100 * (d / h) + "%";
        c.style.bottom = 100 - 100 * (e / l) + "%";
      }
    };
    this.events = function () {
      function a(c) {
        c = b.call(c);
        var d = c.length;
        if (e) {
          c[1] = "on" + c[1];
          if (3 < d) {
            c.pop();
          }
        } else if (3 === d) {
          c.push(false);
        }
        return c;
      }
      function d(a, b) {
        var c = a.shift();
        var d = [f[b]];
        if (e) {
          c[d](a[0], a[1]);
        } else {
          c[d].apply(c, a);
        }
      }
      var e = !g.addEventListener && g.attachEvent;
      var b = Array.prototype.slice;
      var f = {
        add: e ? "attachEvent" : "addEventListener",
        remove: e ? "detachEvent" : "removeEventListener"
      };
      return {
        add: function () {
          d(a(arguments), "add");
        },
        remove: function () {
          d(a(arguments), "remove");
        }
      };
    }();
    this.randomizeWind = function () {
      var c;
      c = k(a.vMaxX, 0.2);
      z = 1 === parseInt(k(2), 10) ? -1 * c : c;
      A = k(a.vMaxY, 0.2);
      if (this.flakes) {
        for (c = 0; c < this.flakes.length; c++) {
          if (this.flakes[c].active) {
            this.flakes[c].setVelocities();
          }
        }
      }
    };
    this.scrollHandler = function () {
      var c;
      p = a.flakeBottom ? 0 : parseInt(g.scrollY || f.documentElement.scrollTop || (r ? f.body.scrollTop : 0), 10);
      if (isNaN(p)) {
        p = 0;
      }
      if (!t && !a.flakeBottom && a.flakes) {
        for (c = 0; c < a.flakes.length; c++) {
          if (0 === a.flakes[c].active) {
            a.flakes[c].stick();
          }
        }
      }
    };
    this.resizeHandler = function () {
      if (g.innerWidth || g.innerHeight) {
        h = g.innerWidth - 16 - a.flakeRightOffset;
        l = a.flakeBottom || g.innerHeight;
      } else {
        h = (f.documentElement.clientWidth || f.body.clientWidth || f.body.scrollWidth) - (!m ? 8 : 0) - a.flakeRightOffset;
        l = a.flakeBottom || f.documentElement.clientHeight || f.body.clientHeight || f.body.scrollHeight;
      }
      s = f.body.offsetHeight;
      n = parseInt(h / 2, 10);
    };
    this.resizeHandlerAlt = function () {
      h = a.targetElement.offsetWidth - a.flakeRightOffset;
      l = a.flakeBottom || a.targetElement.offsetHeight;
      n = parseInt(h / 2, 10);
      s = f.body.offsetHeight;
    };
    this.freeze = function () {
      if (a.disabled) {
        return false;
      }
      a.disabled = 1;
      a.timer = null;
    };
    this.resume = function () {
      if (a.disabled) {
        a.disabled = 0;
      } else {
        return false;
      }
      a.timerInit();
    };
    this.toggleSnow = function () {
      if (a.flakes.length) {
        a.active = !a.active;
        if (a.active) {
          a.show();
          a.resume();
        } else {
          a.stop();
          a.freeze();
        }
      } else {
        a.start();
      }
    };
    this.stop = function () {
      var c;
      this.freeze();
      for (c = 0; c < this.flakes.length; c++) {
        this.flakes[c].o.style.display = "none";
      }
      a.events.remove(g, "scroll", a.scrollHandler);
      a.events.remove(g, "resize", a.resizeHandler);
      if (a.freezeOnBlur) {
        if (m) {
          a.events.remove(f, "focusout", a.freeze);
          a.events.remove(f, "focusin", a.resume);
        } else {
          a.events.remove(g, "blur", a.freeze);
          a.events.remove(g, "focus", a.resume);
        }
      }
    };
    this.show = function () {
      var a;
      for (a = 0; a < this.flakes.length; a++) {
        this.flakes[a].o.style.display = "block";
      }
    };
    this.SnowFlake = function (c, d, e) {
      var b = this;
      this.type = c;
      this.x = d || parseInt(k(h - 20), 10);
      this.y = !isNaN(e) ? e : -k(l) - 12;
      this.vY = this.vX = null;
      this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8];
      this.vAmp = this.vAmpTypes[this.type] || 1;
      this.melting = false;
      this.meltFrameCount = a.meltFrameCount;
      this.meltFrames = a.meltFrames;
      this.twinkleFrame = this.meltFrame = 0;
      this.active = 1;
      this.fontSize = 10 + 10 * (this.type / 5);
      this.o = f.createElement("div");
      this.o.innerHTML = a.snowCharacter;
      if (a.className) {
        this.o.setAttribute("class", a.className);
      }
      this.o.style.color = a.snowColor;
      this.o.style.position = t ? "fixed" : "absolute";
      if (a.useGPU && q.transform.prop) {
        this.o.style[q.transform.prop] = "translate3d(0px, 0px, 0px)";
      }
      this.o.style.width = a.flakeWidth + "px";
      this.o.style.height = a.flakeHeight + "px";
      this.o.style.fontFamily = "arial,verdana";
      this.o.style.cursor = "default";
      this.o.style.overflow = "hidden";
      this.o.style.fontWeight = "normal";
      this.o.style.zIndex = a.zIndex;
      C.appendChild(this.o);
      this.refresh = function () {
        if (isNaN(b.x) || isNaN(b.y)) {
          return false;
        }
        a.setXY(b.o, b.x, b.y);
      };
      this.stick = function () {
        if (r || a.targetElement !== f.documentElement && a.targetElement !== f.body) {
          b.o.style.top = l + p - a.flakeHeight + "px";
        } else if (a.flakeBottom) {
          b.o.style.top = a.flakeBottom + "px";
        } else {
          b.o.style.display = "none";
          b.o.style.top = "auto";
          b.o.style.bottom = "0%";
          b.o.style.position = "fixed";
          b.o.style.display = "block";
        }
      };
      this.vCheck = function () {
        if (0 <= b.vX && 0.2 > b.vX) {
          b.vX = 0.2;
        } else if (0 > b.vX && -0.2 < b.vX) {
          b.vX = -0.2;
        }
        if (0 <= b.vY && 0.2 > b.vY) {
          b.vY = 0.2;
        }
      };
      this.move = function () {
        var c = b.vX * v;
        b.x += c;
        b.y += b.vY * b.vAmp;
        if (b.x >= h || h - b.x < a.flakeWidth) {
          b.x = 0;
        } else if (0 > c && b.x - a.flakeLeftOffset < -a.flakeWidth) {
          b.x = h - a.flakeWidth - 1;
        }
        b.refresh();
        if (l + p - b.y + a.flakeHeight < a.flakeHeight) {
          b.active = 0;
          if (a.snowStick) {
            b.stick();
          } else {
            b.recycle();
          }
        } else {
          if (a.useMeltEffect && b.active && 3 > b.type && !b.melting && 0.998 < Math.random()) {
            b.melting = true;
            b.melt();
          }
          if (a.useTwinkleEffect) {
            if (0 > b.twinkleFrame) {
              if (0.97 < Math.random()) {
                b.twinkleFrame = parseInt(8 * Math.random(), 10);
              }
            } else {
              b.twinkleFrame--;
              if (u) {
                b.o.style.opacity = b.twinkleFrame && 0 === b.twinkleFrame % 2 ? 0 : 1;
              } else {
                b.o.style.visibility = b.twinkleFrame && 0 === b.twinkleFrame % 2 ? "hidden" : "visible";
              }
            }
          }
        }
      };
      this.animate = function () {
        b.move();
      };
      this.setVelocities = function () {
        b.vX = z + k(0.12 * a.vMaxX, 0.1);
        b.vY = A + k(0.12 * a.vMaxY, 0.1);
      };
      this.setOpacity = function (a, b) {
        if (!u) {
          return false;
        }
        a.style.opacity = b;
      };
      this.melt = function () {
        if (!a.useMeltEffect || !b.melting) {
          b.recycle();
        } else if (b.meltFrame < b.meltFrameCount) {
          b.setOpacity(b.o, b.meltFrames[b.meltFrame]);
          b.o.style.fontSize = b.fontSize - b.fontSize * (b.meltFrame / b.meltFrameCount) + "px";
          b.o.style.lineHeight = a.flakeHeight + 2 + 0.75 * a.flakeHeight * (b.meltFrame / b.meltFrameCount) + "px";
          b.meltFrame++;
        } else {
          b.recycle();
        }
      };
      this.recycle = function () {
        b.o.style.display = "none";
        b.o.style.position = t ? "fixed" : "absolute";
        b.o.style.bottom = "auto";
        b.setVelocities();
        b.vCheck();
        b.meltFrame = 0;
        b.melting = false;
        b.setOpacity(b.o, 1);
        b.o.style.padding = "0px";
        b.o.style.margin = "0px";
        b.o.style.fontSize = b.fontSize + "px";
        b.o.style.lineHeight = a.flakeHeight + 2 + "px";
        b.o.style.textAlign = "center";
        b.o.style.verticalAlign = "baseline";
        b.x = parseInt(k(h - a.flakeWidth - 20), 10);
        b.y = parseInt(-1 * k(l), 10) - a.flakeHeight;
        b.refresh();
        b.o.style.display = "block";
        b.active = 1;
      };
      this.recycle();
      this.refresh();
    };
    this.snow = function () {
      var c = 0;
      var d = null;
      var e;
      var d = 0;
      for (e = a.flakes.length; d < e; d++) {
        if (1 === a.flakes[d].active) {
          a.flakes[d].move();
          c++;
        }
        if (a.flakes[d].melting) {
          a.flakes[d].melt();
        }
      }
      if (c < a.flakesMaxActive) {
        d = a.flakes[parseInt(k(a.flakes.length), 10)];
        if (0 === d.active) {
          d.melting = true;
        }
      }
      if (a.timer) {
        q.getAnimationFrame(a.snow);
      }
    };
    this.mouseMove = function (c) {
      if (!a.followMouse) {
        return true;
      }
      c = parseInt(c.clientX, 10);
      if (c < n) {
        v = -2 + 2 * (c / n);
      } else {
        c -= n;
        v = 2 * (c / n);
      }
    };
    this.createSnow = function (c, d) {
      var e;
      for (e = 0; e < c; e++) {
        a.flakes[a.flakes.length] = new a.SnowFlake(parseInt(k(6), 10));
        if (d || e > a.flakesMaxActive) {
          a.flakes[a.flakes.length - 1].active = -1;
        }
      }
      a.targetElement.appendChild(C);
    };
    this.timerInit = function () {
      a.timer = true;
      a.snow();
    };
    this.init = function () {
      var c;
      for (c = 0; c < a.meltFrameCount; c++) {
        a.meltFrames.push(1 - c / a.meltFrameCount);
      }
      a.randomizeWind();
      a.createSnow(a.flakesMax);
      a.events.add(g, "resize", a.resizeHandler);
      a.events.add(g, "scroll", a.scrollHandler);
      if (a.freezeOnBlur) {
        if (m) {
          a.events.add(f, "focusout", a.freeze);
          a.events.add(f, "focusin", a.resume);
        } else {
          a.events.add(g, "blur", a.freeze);
          a.events.add(g, "focus", a.resume);
        }
      }
      a.resizeHandler();
      a.scrollHandler();
      if (a.followMouse) {
        a.events.add(m ? f : g, "mousemove", a.mouseMove);
      }
      a.animationInterval = Math.max(20, a.animationInterval);
      a.timerInit();
    };
    this.start = function (c) {
      if (B) {
        if (c) {
          return true;
        }
      } else {
        B = true;
      }
      if ("string" === typeof a.targetElement && (c = a.targetElement, a.targetElement = f.getElementById(c), !a.targetElement)) {
        throw Error("Snowstorm: Unable to get targetElement \"" + c + "\"");
      }
      if (!a.targetElement) {
        a.targetElement = f.body || f.documentElement;
      }
      if (a.targetElement !== f.documentElement && a.targetElement !== f.body) {
        a.resizeHandler = a.resizeHandlerAlt;
        a.usePixelPosition = true;
      }
      a.resizeHandler();
      a.usePositionFixed = a.usePositionFixed && !r && !a.flakeBottom;
      if (g.getComputedStyle) {
        try {
          w = "relative" === g.getComputedStyle(a.targetElement, null).getPropertyValue("position");
        } catch (d) {
          w = false;
        }
      }
      t = a.usePositionFixed;
      if (h && l && !a.disabled) {
        a.init();
        a.active = true;
      }
    };
    if (a.autoStart) {
      a.events.add(g, "load", y, false);
    }
    return this;
  }(window, document);


const texts = ["Amateur Programmer", "Donate Crypto!", "lispnb and pluggnb ♥♥🤭", "woody.. my dearest 😍", "iluvshed", "#lacethemwithfent", "#lifeiseasy", "#teammhuman"];
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


// CHANGE SONG NAMES AND URLS HERE
// CHANGE SONG NAMES AND URLS HERE
// CHANGE SONG NAMES AND URLS HERE
// CHANGE SONG NAMES AND URLS HERE
// CHANGE SONG NAMES AND URLS HERE
// CHANGE SONG NAMES AND URLS HERE

const songs = [
    { title: "woody - Paint Thinner", src: "https://easyfiles.cc/2024/8/2110cfc6-d700-4c42-bc66-bafa5799c1fc/youtube_rhaFMuU1_qw_1280x720_h264(1).mp4" },
    { title: "woody - God Said I Was Good", src: "https://easyfiles.cc/2024/8/9cafa851-0405-4009-b639-08ff5e029dc3/youtube_Z4IF2ujq1Xk_1280x720_h264(1).mp4" },
    { title: "smokedope2016 - On My Roof", src: "https://easyfiles.cc/2024/9/443c0270-b602-4e6b-8264-07c25018b958/on%20my%20roof.mp4" },
    { title: "SmokeTeam6 - PackistanFlashback", src: "https://easyfiles.cc/2024/9/cb2ad630-0a65-4711-ab07-3482dc42f2d3/SmokeTeam6%20-%20PackistanFlashback%20(VEVO%20Official%20Music%20Video)%20-%20benwbush%20(1080p,%20h264).mp4" },
    { title: "sniper2004 - la ny", src: "https://easyfiles.cc/2024/8/b8332c2a-e70b-4ec0-9ba8-acc7e5449db7/youtube_mkmn3QZSZUM_874x720_h264(1).mp4" },
    { title: "Bladee & Ecco2k - Bleach", src: "https://easyfiles.cc/2024/9/c304f7a4-8ee8-4986-a01e-b748e6053fc7/BLADEE%20&%20ECCO2K%20-%20BLEACH%20-%20drain%20gang%20(720p50,%20h264).mp4" },
    { title: "Joeyy - PR Package", src: "https://easyfiles.cc/2024/8/7c649f45-6573-4665-9675-4d869ea1332a/youtube_ZvphwrKo52s_1280x720_h264(1).mp4" },
    { title: "woody - Heaven & Hell", src: "https://easyfiles.cc/2024/9/642109e4-b695-4d05-afde-502ace233579/woody%20heaven%20&%20hell%20prod.%201mint%20-%20real1woody%20(1080p,%20h264).mp4" }
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
}

loadSong(currentSongIndex);

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
                setTimeout(typeWriterEffect, 1500);
                return;
            }
        } else {
            document.title = fullTitle.substring(0, currentIndex - 1);
            currentIndex--;
            if (currentIndex === 1) {
                forward = true;
                setTimeout(typeWriterEffect, 500);
                return;
            }
        }
        setTimeout(typeWriterEffect, 333);
    }
    typeWriterEffect();
});

let clickToEnterOverlay = document.getElementById('clickToEnter');

clickToEnterOverlay.onclick = () => {
    clickToEnterOverlay.style.transition = '0.75s';
    clickToEnterOverlay.style.opacity = '0';
    clickToEnterOverlay.style.zIndex = '-9999';

    main.style.opacity = "1";
    main.style.marginTop = "0px";

    videoPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;";
    isPlaying = !isPlaying;
    typeWriter();

    // Start snowstorm
    if (typeof snowStorm !== "undefined") {
        snowStorm.start();
    } else {
        console.error("Snowstorm is not defined.");
    }
};


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

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && ["s", "c", "e", "u"].includes(e.key.toLowerCase())) {
            e.preventDefault();
            window.location.href = "";
        }
    });
    document.addEventListener("contextmenu", (e) => e.preventDefault());
});

function copyToClipboard(value) {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard!")
}

