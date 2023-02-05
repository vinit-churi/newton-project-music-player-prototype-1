/************
 * Body click events
 ************/

// listen to click event on the songs queue visibility toggler button
const body = document.querySelector("body");
const songsQueue = document.querySelector(".songs-queue");
body.addEventListener("click", (event) => {
    if (event.target.dataset.songOptionToggle !== undefined) {
        const trackId = event.target.dataset.songOptionToggle;
        document
            .querySelector(`[data-track-id="${trackId}"].song-card-options`)
            .classList.toggle("open-options");
    }
    if (event.target.classList.contains("song-card-option")) {
        console.log(event.target);
    }
    if (event.target.classList.contains("albumCard")) {
        console.log(event.target);
        const url =
            event.target.dataset.tracksLink +
            "?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz";
        const container = document.querySelector(".tracksDivContainer");
        while (container.firstChild) {
            container.firstChild.remove();
        }
        container.innerHTML = "<div class='load'></div>";
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                return response["tracks"];
            })
            .then((tracks) => {
                // console.log(tracks);
                insertTracksIntoContainer(tracks);
            });
    }
    if (event.target.classList.contains("artist-container")) {
        // console.log("is this executing");
        if (event.target.dataset.artistCardOpen === "true") {
            event.target.dataset.artistCardOpen = false;
            removeArtistDetails(event);
            // console.log("inside true");
            // console.log(event.target);
        } else {
            // console.log("inside false");
            event.target.dataset.artistCardOpen = true;
            insertArtistDetails(event);
        }
    }
});

async function insertArtistDetails(event) {
    const artistDropDown = document.createElement("div");
    artistDropDown.classList.add("artist-drop-down");
    const existingDropDown = document.querySelector(".artist-drop-down");
    if (existingDropDown) {
        existingDropDown.remove();
    }
    const openArtistCards = document.querySelectorAll(
        '[data-artist-card-open="true"]'
    );
    [...openArtistCards].forEach(function (card) {
        if (event.target !== card) {
            card.dataset.artistCardOpen = "false";
        }
    });

    // TODO: get artist name
    const name = event.target.dataset.artistName;
    // console.log(name);
    // TODO: get artist bio
    const bio =
        event.target.dataset.artistBio ||
        "Her discography spans multiple genres, and her songwriting—often inspired by her personal life—has received critical praise and wide media coverage. Born in West Reading, Pennsylvania, Swift moved to Nashville at age 14 to become a country artist.";
    const img = `https://api.napster.com/imageserver/v2/artists/${event.target.dataset.artistId}/images/230x153.jpg`;

    const artistBio = document.createElement("div");
    artistBio.classList.add("artistBio");
    const artistTitle = document.createElement("h1");
    const artistImg = document.createElement("img");
    artistImg.classList.add("artistImg");
    artistImg.setAttribute("src", img);
    artistImg.addEventListener("error", function (e) {
        this.src =
            "https://media.istockphoto.com/id/1189316258/photo/he-has-some-amazing-musical-talents.jpg?b=1&s=170667a&w=0&k=20&c=mFttWNgvHzypo5OdfPS9weOzx0R4n8UXjjDIBTZUz4E=";
    });
    const bioDiv = document.createElement("p");
    bioDiv.textContent = bio;
    artistTitle.textContent = name;
    const genreDiv = document.createElement("div");
    genreDiv.classList.add("artist-genre");
    artistBio.append(artistTitle, artistImg, bioDiv, genreDiv);
    const artistTracks = document.createElement("div");
    artistTracks.classList.add("artistTracks");
    const artistAlbums = document.createElement("div");
    artistAlbums.classList.add("artistAlbums");
    const loading = document.createElement("div");
    loading.classList.add("load");
    const loadingClone = loading.cloneNode();
    const albumDivTitle = document.createElement("h1");
    const tracksDivTitle = document.createElement("h1");
    const albumDivContainer = document.createElement("div");
    albumDivContainer.classList.add("albumDivContainer");
    albumDivContainer.classList.add("custom-scroll");
    artistBio.classList.add("custom-scroll");
    const tracksDivContainer = document.createElement("div");
    tracksDivContainer.classList.add("tracksDivContainer");
    tracksDivContainer.classList.add("custom-scroll");
    albumDivTitle.textContent = "Albums";
    tracksDivTitle.textContent = "Tracks";
    tracksDivContainer.append(loading);
    albumDivContainer.append(loadingClone);
    artistAlbums.append(albumDivTitle, albumDivContainer);
    artistTracks.append(tracksDivTitle, tracksDivContainer);
    artistDropDown.append(artistBio, artistAlbums, artistTracks);

    if (event.target.dataset.index <= 2) {
        const target = document.querySelector(
            '[data-index="2"].artist-container'
        );
        // console.log(target);
        target.insertAdjacentElement("afterend", artistDropDown);
    } else if (event.target.dataset.index <= 5) {
        const target = document.querySelector(
            '[data-index="5"].artist-container'
        );
        // console.log(target);
        target.insertAdjacentElement("afterend", artistDropDown);
    } else if (event.target.dataset.index <= 8) {
        const target = document.querySelector(
            '[data-index="8"].artist-container'
        );
        // console.log(target);
        target.insertAdjacentElement("afterend", artistDropDown);
    } else if (event.target.dataset.index <= 11) {
        const target = document.querySelector(
            '[data-index="11"].artist-container'
        );
        // console.log(target);
        target.insertAdjacentElement("afterend", artistDropDown);
    } else if (event.target.dataset.index <= 14) {
        const target = document.querySelector(
            '[data-index="14"].artist-container'
        );
        // console.log(target);
        target.insertAdjacentElement("afterend", artistDropDown);
    }
    const genreLink = event.target.dataset.genre;
    const albumLink = event.target.dataset.albumLink;
    // const promises = [fetch(genreLink), fetch(albumLink)];

    // console.log(bio);
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
        // console.log(genres);

        // TODO: get artist genre :done
        const artistGenre = genres["genres"]
            .map((genre) => genre.name)
            .join(", ");
        // TODO: get artist albums
        // console.log(albums);
        loadingClone.remove();
        albums["albums"].forEach((album, index) => {
            // console.log(album.name, album.id, album["links"]["tracks"]["href"]);
            const HTMLelement = `
                <div data-index="${index}" data-album-id="${album.id}" data-tracks-link="${album["links"]["tracks"]["href"]}" class="albumCard">
                    <img src="https://api.napster.com/imageserver/v2/albums/${album.id}/images/500x500.jpg" />
                    <p class="album-name">${album.name}</p>
                </div>
            `;
            albumDivContainer.insertAdjacentHTML("beforeend", HTMLelement);
        });
        const firstAlbum = albums["albums"][0]["links"]["tracks"]["href"];
        fetch(
            firstAlbum +
                "?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz"
        )
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                return response["tracks"];
            })
            .then((tracks) => {
                // console.log(tracks);
                insertTracksIntoContainer(tracks);
            });
    } catch (error) {
        // console.log(error);
        return;
    }
}

function insertTracksIntoContainer(tracks) {
    const container = document.querySelector(".tracksDivContainer");
    while (container.firstChild) {
        container.firstChild.remove();
    }
    tracks.forEach((track) => {
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
                            </div>
                        </div>
                        `;

        container.insertAdjacentHTML("beforeend", trackHTML);
    });
}
async function removeArtistDetails() {
    // console.log("remoe the artist details");
    const existingDropDown = document.querySelector(".artist-drop-down");
    if (existingDropDown) {
        existingDropDown.remove();
    }
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
        // console.log(topTracks);
        const topTrackList = document.querySelector(".topTracks-list");
        if (topTrackList.querySelector(".load")) {
            topTrackList.querySelector(".load").remove();
        }
        topTracks.forEach((track) => {
            // console.log(track);
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
                    
                </div>
            </div>
            `;
            topTrackList.insertAdjacentHTML("beforeEnd", trackHTML);
        });
    })
    .catch((error) => console.log("error", error));

fetch(
    "https://api.napster.com/v2.2/artists/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=17",
    requestOptions
)
    .then((response) => response.json())
    .then((result) => {
        topArtists = result.artists;
        // console.log(topArtists);
        let i = 0;
        const requiredArtist = [];
        while (i < topArtists.length) {
            try {
                const artist = topArtists[i];
                const {
                    name,
                    id,
                    blurbs,
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
                    blurbs,
                });
                // console.log(name, id, img, albums, genre,bio);
                if (requiredArtist.length === 15) break;
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
            <div data-artist-name="${
                artist.name
            }" data-artist-bio="${blurb.replace(/['"]/g, "")}" data-genre="${
                artist.genre
            }?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz" data-album-link="${
                artist.albums
            }?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz" data-artist-id="${
                artist.id
            }" data-index="${index}" data-artist-card-open="false" class="artist-container">
            <img class="artist-image"
                    src="https://api.napster.com/imageserver/v2/artists/${
                        artist.id
                    }/images/230x153.jpg" onerror="this.src='https://media.istockphoto.com/id/1189316258/photo/he-has-some-amazing-musical-talents.jpg?b=1&s=170667a&w=0&k=20&c=mFttWNgvHzypo5OdfPS9weOzx0R4n8UXjjDIBTZUz4E='" alt="artist">
            <div class="artist-name">${artist.name}</div>
                <i class="fa-solid fa-angle-down"></i>
            </div>
            `;

            artistCardsContainer.insertAdjacentHTML("beforeend", element);
        });
    })
    .catch((error) => console.log(error));

// http://direct.rhapsody.com/imageserver/v2/albums/{{albumId}}/images/300x300.jpg

fetch(
    "http://api.napster.com/v2.2/playlists/featured?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&limit=3"
)
    .then((response) => response.json())
    .then((response) => response.playlists)
    .then((playlists) => {
        const playlistList = document.querySelector(".topPlaylist-list");
        while (playlistList.firstChild) {
            playlistList.firstChild.remove();
        }
        playlists.forEach((playlist) => {
            console.log(playlist);

            const HTMLelement = `
            <div class="playlist-item">
                <img src="https://api.napster.com/imageserver/v2/playlists/${playlist.id}/artists/images/1200x400.jpg?order=frequency&montage=2x2"
                    alt="">
                <h1 class="playlist-name">${playlist.name}</h1>
                <div data-tracks-url="${playlist["links"]["tracks"]["href"]}" data-playlist-id="${playlist.id}" class="playlist-tracks custom-scroll">
                    <div class="load"></div>

                </div>
            </div>
            `;
            playlistList.insertAdjacentHTML("beforeend", HTMLelement);

            const playlistItem = playlistList.querySelector(
                `[data-playlist-id="${playlist.id}"]`
            );
            fetch(
                playlistItem.dataset.tracksUrl +
                    "?apikey=MWE1MjlmMzEtMjNiOC00NzU1LWI2MTYtZmMyZjUzYzUyOWIz&limit=8"
            )
                .then((response) => response.json())
                .then((response) => response.tracks)
                .then((tracks) => {
                    const container = document.querySelector(
                        `[data-playlist-id="${playlist.id}"]`
                    );
                    attachSlider(container);

                    if (container.querySelector(".load")) {
                        container.querySelector(".load").remove();
                    }
                    tracks.forEach((track) => {
                        // console.log(track);
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
                    
                </div>
            </div>
            `;
                        container.insertAdjacentHTML("beforeEnd", trackHTML);
                    });
                });
        });
    });

attachSlider(document.querySelector(".topTracks-list"));

function attachSlider(element) {
    const slider = element;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
    });
}
