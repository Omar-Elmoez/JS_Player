let music = new Audio("audio/12.mp3");
let startPlayingIcon = document.querySelector(".start-playing-icon");
let backIcon = document.querySelector(".back-icon");
let nextIcon = document.querySelector(".next-icon");
let downloadIcon = document.querySelector("#download_icon");
let masterPlayImg = document.querySelector(".player__master-play img");
let masterPlayHeading = document.querySelector(
  ".player__master-play .song-name"
);
const allSubtitles = Array.from(
  document.querySelectorAll('.subtitle')
);
let moodIcon = document.querySelector(".icons .mood_icon");
let mainHeading = document.querySelector('.player__main-content h1');
// because we set a default song => this will make it dynamic if you want to change the default song
let current = parseInt(music.src.match(/\d{2}.mp3/g)),
  clickedPosition,
  mood = "next_song";

let songBar = document.querySelector(".player__song-bar");
let volumeBar = document.querySelector(".player__volume-bar");
let songStartingTime = document.querySelector(".starting_time");
let songEndingTime = document.querySelector(".Ending_time");
let songProgressBar = document.querySelector(".song-progressBar");
let volumeProgressBar = document.querySelector(".volume-progressBar");
let volumeIcon = document.querySelector(".player__volume");

const avalibleSongs = Array.from(document.querySelectorAll(".player__item"));
avalibleSongs.forEach((item) => {
  item.addEventListener("click", () => {
    searchBox.value = "";
    resultBox.innerHTML = "";
  });
});
// ============================== Set All Subtitles Info ==============================
allSubtitles.forEach(item => {
  let relatedMusicIndex = item.parentElement.parentElement.dataset.id;

  let relatedAudio = new Audio(`audio/${relatedMusicIndex}.mp3`);
  relatedAudio.addEventListener('durationchange', () => {
    let duration = relatedAudio.duration;
    setTiming(duration, item)
  })


})
startPlayingMusic(avalibleSongs);

startPlayingIcon.addEventListener("click", () => {
  searchBox.value = '';
  resultBox.innerHTML = '';
  if (music.src === "") return;
  if (music.paused || music.currentTime === 0) {
    music.play();
    startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    startWaving();
    avalibleSongs.forEach((item) => {
      if (+item.dataset.id === current) {
        item
        .querySelector(".play-icon")
        .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
        item.style.border = "2px solid #36e2ec";
        downloadIcon.href = item.querySelector('h5').innerText;
        console.log(downloadIcon.href);
      }
    });
  } else {
    music.pause();
    startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    avalibleSongs.forEach((item) => {
      item
      .querySelector(".play-icon")
      .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    });
    stopWaving();
  }
});
backIcon.addEventListener("click", () => {
  let current_playing_id = parseInt(music.src.match(/\d+.mp3/g));
  avalibleSongs.forEach((song) => {
    if (+song.dataset.id === current_playing_id - 1) {
      song.style.border = "2px solid #36e2ec";
      song
        .querySelector(".play-icon")
        .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      song.style.border = "none";
      song
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  });
  music.src = `audio/${current_playing_id - 1}.mp3`;
  downloadIcon.href = music.src;
  music.play();
  setMasterPlayInfo(current_playing_id - 1);
});
nextIcon.addEventListener("click", () => {
  let current_playing_id = parseInt(music.src.match(/\d+.mp3/g));
  avalibleSongs.forEach((song) => {
    if (+song.dataset.id === current_playing_id + 1) {
      song.style.border = "2px solid #36e2ec";
      song
        .querySelector(".play-icon")
        .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      song.style.border = "none";
      song
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  });
  music.src = `audio/${current_playing_id + 1}.mp3`;
  downloadIcon.href = music.src;
  music.play();
  setMasterPlayInfo(current_playing_id + 1);
});
function startPlayingMusic(arr) {
  arr.forEach((song) => {
    song.querySelector("img").src = 'imgs/poster.jpg';

    song.addEventListener("click", () => {
      setDefaultStylesForSongs(arr);
      song.style.border = "2px solid #36e2ec";

      let song_id = song.dataset.id;
      if (+song_id !== current) {
        current = +song_id;
        music.src = `audio/${current}.mp3`;
        avalibleSongs.forEach(item => {
          if (+item.dataset.id === current)
          downloadIcon.href = item.querySelector('h5').innerHTML;
        })
      }
      if (music.paused || music.currentTime === 0) {
        music.play();
        startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
        song
          .querySelector(".play-icon")
          .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
        startWaving();
      } else {
        music.pause();
        startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
        song
          .querySelector(".play-icon")
          .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
        stopWaving();
      }
      setMasterPlayInfo(song_id);
    });
  });
}
function startWaving() {
  document.querySelectorAll(".wave span").forEach((item) => {
    item.style.cssText = `
      animation-play-state: running;
    `;
  });
}
function stopWaving() {
  document.querySelectorAll(".wave span").forEach((item) => {
    item.style.cssText = `
      animation-play-state: pause;
    `;
  });
}
function setTiming(time, ele) {
  let allMinutesAvalible = parseInt(time / 60);
  let musicHours = parseInt(allMinutesAvalible / 60);
  let musicMiuntes = parseInt(allMinutesAvalible % 60);
  let musicSeconds = parseInt(time % 60);
  if (musicHours < 10) musicHours = `0${musicHours}`;
  if (musicMiuntes < 10) musicMiuntes = `0${musicMiuntes}`;
  if (musicSeconds < 10) musicSeconds = `0${musicSeconds}`;
  // with out (|| 0) it will evaluate NaN every time you switch the song
  ele.innerText = `${musicHours || 0}:${musicMiuntes || 0}:${musicSeconds || 0}`;
}
function updateSongProgressBar() {
  let passedTime = parseInt((music.currentTime / music.duration) * 100);
  songProgressBar.style.width = `${passedTime}%`;
  document.documentElement.style.setProperty("--moveFromLeft", "100%");
}
function moveProgressBarWhenClicking(e, bar) {
  clickedPosition = e.clientX - e.target.offsetLeft;
  if (clickedPosition > bar.parentElement.offsetWidth) return;
  bar.style.width = `${clickedPosition}px`;
  document.documentElement.style.setProperty("--moveFromLeft", "100%");
}
function setMasterPlayInfo(current) {
  avalibleSongs.forEach((song) => {
    if (+song.dataset.id === +current) {
      masterPlayHeading.innerText = song.querySelector("h5").innerText;
      mainHeading.innerText = song.querySelector("h5").innerText;
    }
  });
}
setMasterPlayInfo(current);
function setDefaultStylesForSongs(arr) {
  arr.forEach((item) => {
    item.style.border = "none";
    item
      .querySelector(".play-icon")
      .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
  });
}
// ============================== Activate Timing ==============================
music.addEventListener("timeupdate", () => {
  let duration = music.duration;
  let currentTime = music.currentTime;

  setTiming(currentTime, songStartingTime)
  setTiming(duration, songEndingTime)
  updateSongProgressBar();
});

songBar.addEventListener("click", (e) => {
  moveProgressBarWhenClicking(e, songProgressBar);
  // songProgressBar.parentElement.offsetWidth => to get the width of its parent, because this is
  // the avalible for it to move.
  music.currentTime =
    (clickedPosition / songProgressBar.parentElement.offsetWidth) *
    music.duration;
});
// ============================== Activate Sound ==============================
volumeBar.addEventListener("click", (e) => {
  moveProgressBarWhenClicking(e, volumeProgressBar);
  // the range of music.volume => [0,1]
  music.volume = clickedPosition / 100 > 1 ? 1 : clickedPosition / 100;
  volumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-down-fill");
  volumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-down-fill");
});
volumeIcon.addEventListener("click", () => {
  if (
    volumeIcon.classList.contains("bi-volume-up-fill") ||
    volumeIcon.classList.contains("bi-volume-down-fill")
  ) {
    volumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
    volumeIcon.classList.replace("bi-volume-down-fill", "bi-volume-mute-fill");
    volumeProgressBar.style.width = 0;
    music.volume = 0;
  } else {
    volumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
    volumeProgressBar.style.width = `100%`;
    music.volume = 1;
  }
});
// ============================== Activate Arrows ==============================
const arrows = Array.from(document.querySelectorAll(".popular__arrows"));

for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let clicked_arrow = e.target;
    let current_parent = e.currentTarget.parentElement.parentElement;
    let posters = current_parent.querySelector(".popular__posters");

    if(posters.classList.contains('coming-soon')) return;

    if (clicked_arrow.classList.contains("right-arrow")) {
      posters.scrollLeft += 300;
    } else if (clicked_arrow.classList.contains("left-arrow")) {
      posters.scrollLeft -= 300;
    }
  });
}
// ============================== Changing Mood ==============================
moodIcon.addEventListener("click", () => {
  switch (mood) {
    case "next_song":
      mood = "repeat_song";
      moodIcon.classList.replace("bi-music-note-beamed", "bi-arrow-repeat");
      break;

    case "repeat_song":
      mood = "shuffle";
      moodIcon.classList.replace("bi-arrow-repeat", "bi-shuffle");
      break;

    default:
      mood = "next_song";
      moodIcon.classList.replace("bi-shuffle", "bi-music-note-beamed");
  }
});

music.addEventListener("ended", () => {
  if (mood === "next_song") {
    nextIcon.click();
  } else if (mood === "repeat_song") {
    music.play();
  } else {
    let randomNum = Math.floor(Math.random() * 19);
    // we add 1 to randomNum because, we start our dataset.id from 1 and randomNum could be 0 also adding 1 make it
    // possible to get 19;
    current = randomNum + 1;
    music.src = `audio/${randomNum + 1}.mp3`;
    music.play();
    setMasterPlayInfo(randomNum + 1);
    console.log(music.src);
    setDefaultStylesForSongs();
    avalibleSongs.forEach((item) => {
      if (+item.dataset.id === randomNum + 1) {
        item.style.border = "2px solid #36e2ec";
        item
          .querySelector(".play-icon")
          .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
      }
    });
  }
});

// ============================== Activate Search Box ==============================
let searchBox = document.getElementById("search-box");
let resultBox = document.querySelector(".player__search-results");
const allSongsNames = avalibleSongs.map(
  (item) => item.querySelector("h5").innerText.toLowerCase()
);
// with event (change) it executes after hitting -Enter-
// when writing a capital letter using (shift + letter) this means to events so the code below will trigger twice
searchBox.addEventListener("keyup", (e) => {
  resultBox.innerHTML = "";
  
  // !e.shiftKey => To not trigger the event with shift key
  if (searchBox.value !== "" && !e.shiftKey) {
    const searchedValuesIndexes = allSongsNames
      .map((item, index) => {
        if (item.includes(searchBox.value.toLowerCase())) {
          return index;
        }
      })
      .filter((item) => item !== undefined);

    const wantedSongs = avalibleSongs.filter((item) =>
      searchedValuesIndexes.includes(+item.dataset.id - 1)
    );

    wantedSongs.forEach((ele) => {
      let resultItem = `
        <div class="player__songs-item searched-song" data-id=${ele.dataset.id}>
          ${ele.querySelector("img").outerHTML}
          <div>
            ${ele.querySelector("h5").outerHTML}
            <p class="subtitle">${ele.querySelector("p").innerText}</p>
          </div>
          ${ele.querySelector("i").outerHTML}
        </div>`;

      resultBox.innerHTML += resultItem;
    });
    const searchedSongs = Array.from(
      document.querySelectorAll(".searched-song")
    );
    startPlayingMusic(searchedSongs);
    searchedSongs.forEach((item) => {
      item.addEventListener("click", () => {
        avalibleSongs.forEach((item) => (item.style.border = "none"));
      });
    });
  } else {
    resultBox.innerHTML = "";
  }
});

