let music = new Audio("audio/12.mp3");
let startPlayingIcon = document.querySelector(".start-playing-icon");
let backIcon = document.querySelector('.back-icon');
let nextIcon = document.querySelector('.next-icon');
let masterPlayImg = document.querySelector(".player__master-play img");
let masterPlayHeading = document.querySelector(
  ".player__master-play .song-name"
);
let masterPlaySubtitle = document.querySelector(
  ".player__master-play .subtitle"
);

// because we set a default song => this will make it dynamic if you want to change the default song
let current = parseInt(music.src.match(/\d{2}.mp3/g)[0]), clickedPosition;

let songBar = document.querySelector(".player__song-bar");
let volumeBar = document.querySelector(".player__volume-bar");
let songStartingTime = document.querySelector(".starting_time");
let songEndingTime = document.querySelector(".Ending_time");
let songProgressBar = document.querySelector(".song-progressBar");
let volumeProgressBar = document.querySelector(".volume-progressBar");
let volumeIcon = document.querySelector(".player__volume");

const avalibleSongs = Array.from(document.querySelectorAll(".player__item"));
avalibleSongs.forEach((song) => {
  song.querySelector("img").src = `imgs/${song.dataset.id}.jpg`;

  song.addEventListener("click", () => {
    avalibleSongs.forEach((item) => {
      item.style.border = "none";
      item
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    });

    song.style.border = "2px solid #36e2ec";

    current = song.dataset.id;
    let current_id = new RegExp(`${current}.mp3`, "g");
    if (!current_id.test(music.src)) {
      music.src = `audio/${song.dataset.id}.mp3`;
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

    masterPlayImg.src = song.querySelector("img").src;
    masterPlayHeading.innerText = song.querySelector("h5").innerText;
    masterPlaySubtitle.innerText = song.querySelector("p").innerText;
  });
});

startPlayingIcon.addEventListener("click", () => {
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
backIcon.addEventListener('click', () => {
  let current_playing_id = parseInt(music.src.match(/\d+.mp3/g)[0]);
  avalibleSongs.forEach(song => {
    if(+song.dataset.id === current_playing_id - 1) {
      song.style.border = "2px solid #36e2ec";
      song
      .querySelector(".play-icon")
      .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      song.style.border = 'none';
      song
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  })
  music.src = `audio/${ current_playing_id - 1}.mp3`;
  music.play();
})
nextIcon.addEventListener('click', () => {
  let current_playing_id = parseInt(music.src.match(/\d+.mp3/g)[0]);
  avalibleSongs.forEach(song => {
    if(+song.dataset.id === current_playing_id + 1) {
      song.style.border = "2px solid #36e2ec";
      song
      .querySelector(".play-icon")
      .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    } else {
      song.style.border = 'none';
      song
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  })
  music.src = `audio/${ current_playing_id + 1}.mp3`;
  music.play();
})
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
function setStartingTime() {
  let currentMinutes = parseInt(music.currentTime / 60);
  let currentSeconds = parseInt(music.currentTime % 60);
  if (currentMinutes < 10) currentMinutes = `0${currentMinutes}`;
  if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
  songStartingTime.innerText = `${currentMinutes}:${currentSeconds}`;
}
function setEndingTime() {
  let allMinutes = parseInt(music.duration / 60);
  let allSeconds = parseInt(music.duration % 60);
  if (allMinutes < 10) allMinutes = `0${allMinutes}`;
  if (allSeconds < 10) allSeconds = `0${allSeconds}`;
  // with out (|| 0) it will evaluate NaN every time you switch the song
  songEndingTime.innerText = `${allMinutes || 0}:${allSeconds || 0}`;
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
// ============================== Activate Timing ==============================
music.addEventListener("timeupdate", () => {
  setStartingTime();
  setEndingTime();
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

    if (clicked_arrow.classList.contains("right-arrow")) {
      posters.scrollLeft += 150;
    } else if (clicked_arrow.classList.contains("left-arrow")) {
      posters.scrollLeft -= 150;
    }
  });
}
