let music = new Audio("audio/2.mp3");
let startPlayingIcon = document.querySelector(".start-playing-icon");
let masterPlayImg = document.querySelector(".player__master-play img");
let masterPlayHeading = document.querySelector(
  ".player__master-play .song-name"
);
let masterPlaySubtitle = document.querySelector(
  ".player__master-play .subtitle"
);

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

    let current = song.dataset.id;
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
