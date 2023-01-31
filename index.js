/************
 * Body click events
 ************/

// listen to click event on the songs queue visibility toggler button
const body = document.querySelector("body");
const songsQueue = document.querySelector(".songs-queue");
body.addEventListener("click", (event) => {
    if (
        event.target.classList.contains("songs-queue-toggler") ||
        document.querySelector(".songs-queue-toggler").contains(event.target)
    ) {
        songsQueue.classList.toggle("open");
    }
    if (event.target.dataset.songOptionToggle !== undefined) {
        const trackId = event.target.dataset.songOptionToggle;
        document
            .querySelector(`[data-track-id="${trackId}"].song-card-options`)
            .classList.toggle("open-options");
    }
    if (event.target.classList.contains("song-card-option")) {
        console.log(
            event.target.parentNode.parentNode,
            event.target.dataset.value
        );
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

/* fetch(
    "https://api.napster.com/v2.1/tracks/top?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topTracks = result.tracks;
        console.log(topTracks);
        const topTrackList = document.querySelector(".topTracks-list");
        if (topTrackList.querySelector(".load")) {
            topTrackList.querySelector(".load").remove();
        }
        topTracks.forEach((track) => {
            console.log(track);
            const trackHTML = `
            <div data-track-name="${track.name}" data-album-name="${track.albumName}" data-preview-url="${track.previewURL}" data-track-id="${track.id}"  class="song-card" data-song-preview="previewURL">
                <img src="http://direct.rhapsody.com/imageserver/v2/albums/${track.albumId}/images/300x300.jpg"
                    alt="">
                <i data-song-option-toggle="${track.id}" class="fa-solid fa-ellipsis"></i>
                <div data-track-id="${track.id}" class="song-card-options">
                    <p data-value="addToPlaylist" data-track-id="${track.id}" class="song-card-option">Add to playlist</p>
                    <p data-value="addToQueue" data-track-id="${track.id}" class="song-card-option">Add to queue</p>
                    <p data-value="playNow" data-track-id="${track.id}" class="song-card-option">Play now</p>
                </div>
                <div class="music-text custom-scroll">
                    <p class="primary-text">${track.name}</p>
                    <p class="primary-text">${track.albumName}</p>
                </div>
            </div>
            `;
            topTrackList.insertAdjacentHTML("beforeEnd", trackHTML);
        });
    })
    .catch((error) => console.log("error", error)); */

fetch(
    "https://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=7",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topArtists = result.artists;
        console.log(topArtists);
        topArtists.forEach((artist) => {
            const {
                name,
                id,
                bios: {
                    0: { bio },
                },
            } = artist;
            console.log(name, id, bio);
            const img = `https://api.napster.com/imageserver/v2/artists/${id}/images/230x153.jpg`;
        });
    })
    .catch((error) => console.log("error", error));

/* 
https://api.napster.com/imageserver/v2/artists/Art.44069/images/230x153.jpg
    artist = {
        bios: [
            {
                bio : ""
            }
        ]
    }
*/

/* fetch(
    "https://api.napster.com/v2.2/genres/g.397/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=5",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topGenre = result;
        console.log(topGenre);
    })
    .catch((error) => console.log("error", error)); */

// http://direct.rhapsody.com/imageserver/v2/albums/{{albumId}}/images/300x300.jpg

/* 

 TOP TRACKS

*/
