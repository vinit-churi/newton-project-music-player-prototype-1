/************
 * Body click events
 ************/

// listen to click event on the songs queue visibility toggler button
const body = document.querySelector("body");
const songsQueue = document.querySelector(".songs-queue");
body.addEventListener("click", (event) => {
    console.log(event.target.classList);
    if (
        event.target.classList.contains("songs-queue-toggler") ||
        document.querySelector(".songs-queue-toggler").contains(event.target)
    ) {
        songsQueue.classList.toggle("open");
    }
    if (event.target.dataset.songOptionToggle !== undefined) {
        document
            .querySelector(".song-card-options")
            .classList.toggle("open-options");
    }
});

/************
 * HTML5 custom audio player
 ************/

/************
 * fetching top tracks, artists
 ************/

let topTracks = [];
let topArtists = [];
let topGenre = [];

let requestOptions = {
    method: "GET",
    redirect: "follow",
};

fetch(
    "https://api.napster.com/v2.1/tracks/top?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topTracks = result;
        console.log(topTracks);
    })
    .catch((error) => console.log("error", error));

fetch(
    "https://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topArtists = result;
        console.log(topArtists);
    })
    .catch((error) => console.log("error", error));

fetch(
    "https://api.napster.com/v2.2/genres/g.397/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=5",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topGenre = result;
        console.log(topGenre);
    })
    .catch((error) => console.log("error", error));

// http://direct.rhapsody.com/imageserver/v2/albums/{{albumId}}/images/300x300.jpg

/* 

 <div style="background-image:url({{images.0.url}})" data-playlist-id="{{id}}" data-playlist-name="{{name}}" class="cover">
  <div class="content-name">{{name}}</div></div>

*/

/* 
<div data-track-id="{{id}}" style="background-image:url(http://direct.rhapsody.com/imageserver/v2/albums/{{albumId}}/images/300x300.jpg)" class="cover">
  <div class=content-name>{{name}}</div>
  <audio controls class= "audio">
    <source src="{{previewURL}}" type="audio/mpeg">
  </audio>
  </div>

*/
