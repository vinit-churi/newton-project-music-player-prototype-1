console.log("connected");
const body = document.querySelector("body");
const songsQueue = document.querySelector(".songs-queue");
body.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (event.target.classList.contains("songs-queue-toggler")) {
        songsQueue.classList.toggle("open");
    }
});
