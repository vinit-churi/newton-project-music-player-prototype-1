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
    if ((event.target.dataset.belongsTo = "artist-card")) {
        if (event.target.dataset.artistCardOpen === "true") {
            event.target.dataset.artistCardOpen = false;
            removeArtistDetails(event);
        } else {
            event.target.dataset.artistCardOpen = true;
            insertArtistDetails(event);
        }
    }
});

async function insertArtistDetails(event) {
    const genreLink = event.target.dataset.genre;
    const albumLink = event.target.dataset.albumLink;
    // const promises = [fetch(genreLink), fetch(albumLink)];
    // TODO: get artist bio
    const bio =
        event.target.dataset.artistBio ||
        "Her discography spans multiple genres, and her songwriting—often inspired by her personal life—has received critical praise and wide media coverage. Born in West Reading, Pennsylvania, Swift moved to Nashville at age 14 to become a country artist.";
    console.log(bio);
    try {
        const [genres, albums] = await Promise.allSettled([
            fetch(genreLink),
            fetch(albumLink),
        ])
            .then((results) => results.map((result) => result.value.json()))
            .then((results) => {
                return Promise.allSettled(results);
            })
            .then((results) => {
                return results.map((result) => result.value);
            });
        console.log(genres);

        // TODO: get artist genre :done
        const artistGenre = genres["genres"]
            .map((genre) => genre.name)
            .join(", ");
        // TODO: get artist albums
        console.log(albums);
        albums["albums"].forEach((album) => {
            console.log(album.name, album.id, album["links"]["tracks"]["href"]);
            let img = `https://api.napster.com/imageserver/v2/albums/${album.id}/images/500x500.jpg`;
        });
    } catch (error) {
        console.log(error);
        return;
    }

    if (event.target.dataset.index <= 2) {
        const target = document.querySelector(
            '[data-index="2"].artist-container'
        );
        // console.log(target);
    } else if (event.target.dataset.index <= 5) {
        const target = document.querySelector(
            '[data-index="5"].artist-container'
        );
        // console.log(target);
    } else {
        const target = document.querySelector(
            '[data-index="8"].artist-container'
        );
        // console.log(target);
    }
}
async function removeArtistDetails() {
    console.log("remoe the artist details");
}

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
    .catch((error) => console.log("error", error));

fetch(
    "https://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=26",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topArtists = result.artists;
        console.log(topArtists);
        let i = 0;
        const requiredArtist = [];
        while (i < topArtists.length) {
            try {
                const artist = topArtists[i];
                const {
                    name,
                    id,
                    blurbs,
                    bios: {
                        0: { bio },
                    },
                    links: {
                        albums: { href: albums },
                        genres: { href: genre },
                    },
                } = artist;
                const img = `https://api.napster.com/imageserver/v2/artists/${id}/images/230x153.jpg`;
                i++;
                requiredArtist.push({
                    name,
                    id,
                    img,
                    albums,
                    genre,
                    bio,
                    blurbs,
                });
                // console.log(name, id, img, albums, genre,bio);
                if (requiredArtist.length === 9) break;
            } catch (error) {
                i++;
            }
        }

        const artistCardsContainer = document.querySelector(".topArtists-list");
        artistCardsContainer.querySelector(".load").remove();
        // console.log(document.querySelector(".topPlaylist-list > .load"));
        // console.log(requiredArtist, requiredArtist);
        requiredArtist.forEach((artist, index) => {
            const blurb = artist.blurbs.join(" ");
            // console.log(blurb);
            const element = `
            <div data-artist-name="${artist.name}" data-artist-bio="${blurb}" data-genre="${artist.genre}?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz" data-album-link="${artist.albums}?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz" data-artist-id="${artist.id}" data-belongs-to="artist-card" data-index="${index}" data-artist-card-open="false" class="artist-container">
            <img data-belongs-to="artist-card" class="artist-image"
                    src="https://api.napster.com/imageserver/v2/artists/${artist.id}/images/230x153.jpg" alt="artist">
            <div data-belongs-to="artist-card" class="artist-name">${artist.name}</div>
                <i data-belongs-to="artist-card" class="fa-solid fa-angle-down"></i>
            </div>
            `;

            artistCardsContainer.insertAdjacentHTML("beforeend", element);
        });
    })
    .catch((error) => console.log(error));

// http://direct.rhapsody.com/imageserver/v2/albums/{{albumId}}/images/300x300.jpg
