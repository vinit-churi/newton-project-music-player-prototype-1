/************
 * Body click events
 ************/

// listen to click event on the songs queue visibility toggler button
const body = document.querySelector("body");
const songsQueue = document.querySelector(".songs-queue");
body.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("songs-queue-toggler")) {
        songsQueue.classList.toggle("open");
    }
});

/************
 * HTML5 custom audio player
 ************/

// pause and play icon toggle
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

[playIcon, pauseIcon].forEach((icon) => {
    icon.addEventListener("click", () => {
        playIcon.classList.toggle("hide-icon");
        pauseIcon.classList.toggle("hide-icon");
    });
});

const rangeInputs = document.querySelectorAll('input[type="range"]');

function handleInputChange(e) {
    let target = e.target;
    if (e.target.type !== "range") {
        target = document.getElementById("range");
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
    input.addEventListener("input", handleInputChange);
});
