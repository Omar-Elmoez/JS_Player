let music = new Audio("audio/Mariam.mp3");
let startPlayingIcon = document.querySelector(".start-playing-icon");
let btn = document.querySelector(".player__btns button");
let backIcon = document.querySelector(".back-icon");
let nextIcon = document.querySelector(".next-icon");
let downloadIcon = document.querySelector("#download_icon");
let masterPlayImg = document.querySelector(".player__master-play img");
let masterPlayHeading = document.querySelector(
  ".player__master-play .song-name"
);
const playListItems = Array.from(
  document.querySelectorAll(".player__play-list_item")
);
let sideSurahsBox = document.querySelector(".player__songs-list");
let mainSurahsBox = document.querySelector(".popular__posters");
let moodIcon = document.querySelector(".icons .mood_icon");
let mainHeading = document.querySelector(".player__main-content h1");
let songBar = document.querySelector(".player__song-bar");
let volumeBar = document.querySelector(".player__volume-bar");
let songStartingTime = document.querySelector(".starting_time");
let songEndingTime = document.querySelector(".Ending_time");
let songProgressBar = document.querySelector(".song-progressBar");
let volumeProgressBar = document.querySelector(".volume-progressBar");
let volumeIcon = document.querySelector(".player__volume-icon");
// because we set a default song => this will make it dynamic if you want to change the default song
let current = music.src.match(/\w+-?\w+.mp3/g)[0],
  clickedPosition,
  searchedSongs,
  lovedSurahs,
  mood = "next_song";
let choose_btn = document.getElementById("choose-reciter");
let data,
  all_options = [],
  quranAudio = new Audio(),
  reciterName,
  surahIndex,
  audioPlayingNow;
let reciters_btn = document.querySelector(".drop-down__toggle-reciters");
let recitersList = document.querySelector(".drop-down__options");
let surahs_btn = document.querySelector(".drop-down__toggle-surahs");
let surahs_bx = document.querySelector(".surahs-options");
let surahsList = [];
let starting_btn = document.getElementById("api-btn");
let pause_icon = document.querySelector(".pause-icon");
let searchBox = document.getElementById("search-box");
let resultBox = document.querySelector(".player__search-results");
let error_msg;
const surahsNames = [
  "Al-Fateha",
  "Al-Bakara",
  "Al-Emran",
  "Al-Nesaa",
  "Al-Maeda",
  "Al-Anaam",
  "Al-Aaraf",
  "Al-Anfal",
  "Al-Tawba",
  "Younos",
  "Hood",
  "Yusuf",
  "Al-Raad",
  "Ibrahim",
  "Al-Hejr",
  "Al-Nahl",
  "Al-Esraa",
  "Al-Kahf",
  "Mariam",
  "Taha",
  "Al-Anbiaa",
  "Al-Haj",
  "Al-Moamenon",
  "Al-Nour",
  "Al-Forkan",
  "Al-Shoaraa",
  "Al-Naml",
  "Al-Kasas",
  "Al-Ankabot",
  "Al-Rom",
  "Lokman",
  "Al-Sajda",
  "Al-Ahzab",
  "Sabaa",
  "Fater",
  "Yassein",
  "Al-Saffat",
  "Sadd",
  "Al-Zomar",
  "Ghafer",
  "Fosselat",
  "Al-Shora",
  "Al-Zokhrof",
  "Al-Dokhan",
  "Al-Jathia",
  "Al-Ahkaf",
  "Muhammad",
  "Al-Fath",
  "Al-Hojorat",
  "kaf",
  "Al-Zariat",
  "Al-Tor",
  "Al-Najm",
  "Al-Kamar",
  "Al-Rahman",
  "Al-Wakea",
  "Al-Hadid",
  "Al-Mojadala",
  "Al-Hashr",
  "Al-Momtahana",
  "Al-Saf",
  "Al-Jomoa",
  "Al-Monafekon",
  "Al-Taghabon",
  "Al-Talak",
  "Al-Tahreem",
  "Al-Molk",
  "Al-kalam",
  "Al-Hakka",
  "Al-Maarej",
  "Nouh",
  "Al-Jen",
  "Al-Mozamil",
  "Al-Modather",
  "Al-Keiama",
  "Al-Ensan",
  "Al-Morssalat",
  "Al-Nabaa",
  "Al-Nazeat",
  "Abasa",
  "Al-Takwir",
  "Al-Enfetar",
  "Al-Motaffefin",
  "Al-Enshekak",
  "Al-Boroj",
  "Al-Tarek",
  "Al-Aala",
  "Al-Ghashia",
  "Al-Fajr",
  "Al-Balad",
  "Al-Shams",
  "Al-Lail",
  "Al-Doha",
  "Al-Sharh",
  "Al-Teen",
  "Al-Alak",
  "Al-kadr.",
  "Al-Baiena",
  "Al-Zalzala",
  "Al-Adiat",
  "Al-Karea",
  "Al-Takathor",
  "Al-Asr",
  "Al-Homaza",
  "Al-Feel",
  "Koraish",
  "Al-Maaon",
  "Al-Kawthar",
  "Al-Kaferon",
  "Al-Nasr",
  "Al-Masad",
  "Al-Ekhlas",
  "Al-Falak",
  "Al-Nas",
];
createSurahsElements();
const avalibleSongs = Array.from(document.querySelectorAll(".player__item"));
const allSongsNames = avalibleSongs.map(
  (item) => item.querySelector("h5").innerText
);
const allSubtitles = Array.from(document.querySelectorAll(".subtitle"));
avalibleSongs.forEach((item) => {
  item.addEventListener("click", () => {
    setDefaultStylesForSongs(avalibleSongs);
    playMusic(item);
  });
});
// ============================== set Data Names And Durations ==============================
function setDataNamesAndDurations() {
  avalibleSongs.forEach((item) => {
    let item_id = item.querySelector("h5").innerText;
    item.setAttribute("data-name", `${item_id}.mp3`);
    let relatedAudio = new Audio(`audio/${item.dataset.name}`);
    relatedAudio.addEventListener("durationchange", () => {
      item.setAttribute("data-duration", relatedAudio.duration);
      item.querySelector(".subtitle").innerText = setHoursAndMiuntesAndSeconds(
        relatedAudio.duration
      );
    });
  });
}
setDataNamesAndDurations();
// ============================== Player Play List ==============================
playListItems.forEach((item) => {
  item.addEventListener("click", () => {
    playListItems.forEach((ele) => ele.classList.remove("active"));
    item.classList.add("active");
    if (item.innerText === "Loved Surahs") {
      createLovedSurahsElements();
    } else {
      showAllSurahs();
    }
  });
});

// ============================== Create Songs Elements ==============================
function createSurahsElements() {
  surahsNames.forEach((surah, index) => {
    if (index < 15) {
      let surahElement = `
        <li class="player__songs-item player__item">
          <span>${index + 1}</span>
          <img src="imgs/poster.jpg" alt="album" />
          <div>
            <h5 class="song-name">${surah}</h5>
            <p class="subtitle"></p>
          </div>
          <i class="bi bi-play-circle-fill play-icon unique-icon"></i>
        </li>
        `;
      sideSurahsBox.innerHTML += surahElement;
    } else if (index < 30) {
      let surahElement = `
        <div class="popular__posters-item player__item">
          <div class="img-play">
            <img src="imgs/poster.jpg" alt="poster" />
            <i class="bi bi-play-circle-fill play-icon"></i>
          </div>
          <div>
            <h5>${surah}</h5>
            <p class="subtitle"></p>
          </div>
        </div>
        `;
      mainSurahsBox.innerHTML += surahElement;
    }
  });
}
function createLovedSurahsElements() {
  sideSurahsBox.innerHTML = "";
  avalibleSongs.map((item, index) => {
    if (item.classList.contains("loved")) {
      let spanElement = item.querySelector("span")
        ? ""
        : `<span>${index}</span>`;
      sideSurahsBox.innerHTML += ` 
        <li class="player__songs-item player__item loved-song" data-name = ${item.dataset.name}>
          ${spanElement}
          ${item.innerHTML}
        </li>
      `;
    }
  });
  lovedSurahs = Array.from(document.querySelectorAll(".loved-song"));
  lovedSurahs.forEach((item) => {
    item.addEventListener("click", () => {
      setDefaultStylesForSongs(lovedSurahs);
      setDefaultStylesForSongs(avalibleSongs);
      item.setAttribute(
        "data-name",
        `${item.querySelector("h5").innerText}.mp3`
      );
      playMusic(item);
    });
  });
}
function showAllSurahs() {
  sideSurahsBox.innerHTML = "";
  avalibleSongs.map((item, index) => {
    if (index < 15) {
      sideSurahsBox.appendChild(item);
    } else {
      mainSurahsBox.appendChild(item);
    }
  });
}
// ============================== Calc Hours & Minutes & Seconds ==============================
function setHoursAndMiuntesAndSeconds(time) {
  let allMinutesAvalible = parseInt(+time / 60);
  let musicHours = parseInt(allMinutesAvalible / 60);
  let musicMiuntes = parseInt(allMinutesAvalible % 60);
  let musicSeconds = parseInt(+time % 60);
  if (musicHours < 10) musicHours = `0${musicHours}`;
  if (musicMiuntes < 10) musicMiuntes = `0${musicMiuntes}`;
  if (musicSeconds < 10) musicSeconds = `0${musicSeconds}`;
  // with out (|| 0) it will evaluate NaN every time you switch the song
  return `${musicHours || 0}:${musicMiuntes || 0}:${musicSeconds || 0}`;
}

// ============================== Activate Start Playing Icon ==============================
startPlayingIcon.addEventListener("click", () => {
  if (audioPlayingNow === "api") {
    if (!quranAudio.paused) {
      stopWaving();
      quranAudio.pause();
      startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
      pause_icon.classList.replace(
        "bi-pause-circle-fill",
        "bi-play-circle-fill"
      );
    } else {
      quranAudio.play();
      startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
      pause_icon.classList.replace(
        "bi-play-circle-fill",
        "bi-pause-circle-fill"
      );
    }
  } else {
    if (music.paused || music.currentTime === 0) {
      music.play();
      startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
      startWaving();
      Array.from(document.querySelectorAll(".player__item")).forEach((item) => {
        if (item.dataset.name === current) {
          item
            .querySelector(".play-icon")
            .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
        }
      });
    } else {
      music.pause();
      startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
      Array.from(document.querySelectorAll(".player__item")).forEach((item) => {
        if (item.dataset.name === current) {
          item
            .querySelector(".play-icon")
            .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
        }
      });
      stopWaving();
    }
    setDownloadInfo();
  }
});

// ============================== Next & Prev ==============================
backIcon.addEventListener("click", () => {
  // if (audioPlayingNow === "local") nextAndPrevSong("prev");
  if (audioPlayingNow === "local") {
    nextAndPrevSong("prev");
  } else {
    let current_api_index = parseInt(quranAudio.src.match(/\d+.mp3/g)[0]);
    quranAudio.src = quranAudio.src.replace(
      /\d+.mp3/g,
      `${current_api_index - 1}.mp3`
    );
    surahs_btn.innerText = surahsNames[current_api_index - 2];
    quranAudio.play();
    pause_icon.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  }
});
nextIcon.addEventListener("click", () => {
  if (audioPlayingNow === "local") {
    nextAndPrevSong("next");
  } else {
    let current_api_index = parseInt(quranAudio.src.match(/\d+.mp3/g)[0]);
    quranAudio.src = quranAudio.src.replace(
      /\d+.mp3/g,
      `${current_api_index + 1}.mp3`
    );
    surahs_btn.innerText = surahsNames[current_api_index];
    quranAudio.play();
    pause_icon.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  }
});
function nextAndPrevSong(dir) {
  let arr;
  let current_playing_element = Array.from(
    document.querySelectorAll(".player__item")
  ).filter(
    (item) => getComputedStyle(item).borderColor === "rgb(54, 226, 236)" || item.querySelector('i').classList.contains('bi-pause-circle-fill')
  )[0];
  let current_playing_index, coming_playing_index;
  if (current_playing_element.classList.contains("loved-song")) {
    arr = Array.from(document.querySelectorAll(".loved-song"));
  } else if (current_playing_element.classList.contains("searched-song")) {
    arr = Array.from(document.querySelectorAll(".searched-song"));
  } else {
    arr = avalibleSongs;
  }
  arr.forEach((item, index) => {
    if (item.dataset.name === current_playing_element.dataset.name) {
      current_playing_index = index;
      item.style.border = "none";
      item
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    }
  });
  if (dir === "next") {
    coming_playing_index = current_playing_index + 1;
    if (coming_playing_index === arr.length) coming_playing_index = 0;
    playMusic(arr[coming_playing_index]);
  } else {
    coming_playing_index = current_playing_index - 1;
    if (coming_playing_index < 0) coming_playing_index = 0;
    playMusic(arr[coming_playing_index]);
  }
}

// ============================== Activate Playing Music ==============================
function playMusic(item) {
  quranAudio.pause();
  pause_icon.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
  if (searchBox.value !== "") {
    searchedSongs.forEach((item) => {
      item.style.border = "none";
      item
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    });
  }
  item.style.border = "2px solid #36e2ec";
  if (item.classList.contains("loved")) {
    loveThisSong("yes");
  } else {
    loveThisSong("no");
  }

  if (item.dataset.name !== current) {
    current = item.dataset.name;
    music.src = `audio/${current}`;
  }
  if (item.dataset.name === current) {
    setDownloadInfo();
  }
  if (music.paused || music.currentTime === 0) {
    music.play();
    startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    item
      .querySelector(".play-icon")
      .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    startWaving();
  } else {
    music.pause();
    startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    item
      .querySelector(".play-icon")
      .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    stopWaving();
  }
  setMasterPlayInfo(item.dataset.name);
}

// ============================== Activate Waving ==============================
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

// ============================== Control Progress Bar  ==============================
function moveProgressBarWhenClicking(e, bar) {
  clickedPosition = e.clientX - e.target.offsetLeft;
  if (clickedPosition > bar.parentElement.offsetWidth) return;
  bar.style.width = `${clickedPosition}px`;
  document.documentElement.style.setProperty("--moveFromLeft", "100%");
}
function moveProgressBarWithAudio(audio) {
  let aud_dur = audio.duration / 100;
  let aud_curr = audio.currentTime;
  let dis = parseInt(aud_curr / aud_dur);
  songProgressBar.style.width = `${dis}%`;
  document.documentElement.style.setProperty("--moveFromLeft", "100%");
}
// ============================== Music And Quran Audio Playing  ==============================
music.addEventListener("playing", () => {
  audioPlayingNow = "local";
  setStartAndEndTime(music);
  updateAudio(music);
});
quranAudio.addEventListener("playing", () => {
  audioPlayingNow = "api";
  setStartAndEndTime(quranAudio);
  updateAudio(quranAudio);
  startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  masterPlayHeading.innerText = surahs_btn.innerText;
  mainHeading.innerText = surahs_btn.innerText;
  startWaving();
  document.querySelector(".loading-icon").style.opacity = "0";
  pause_icon.style.opacity = "1";
  downloadIcon.href = quranAudio.src;
  downloadIcon.setAttribute("download", "");
  searchBox.value = "";
  resultBox.innerHTML = "";
  if (avalibleSongs) setDefaultStylesForSongs(avalibleSongs);
  if (lovedSurahs) setDefaultStylesForSongs(lovedSurahs);
  if (searchedSongs) setDefaultStylesForSongs(searchedSongs);
  if (document.querySelector(".icon-bx p"))
    document.querySelector(".icon-bx p").remove();
});
// ============================== Set Master Play Info  ==============================
function setMasterPlayInfo(current) {
  avalibleSongs.forEach((song) => {
    if (song.dataset.name === current) {
      masterPlayHeading.innerText = song.querySelector("h5").innerText;
      mainHeading.innerText = song.querySelector("h5").innerText;
    }
  });
}
setMasterPlayInfo(current);

// ============================== Default Setting  ==============================
function setDefaultStylesForSongs(arr) {
  if (arr.length !== 0) {
    arr.forEach((item) => {
      item.style.border = "none";
      item
        .querySelector(".play-icon")
        .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    });
  }
}

// ============================== Activate Timing ==============================
function setStartAndEndTime(audio) {
  songEndingTime.innerText = setHoursAndMiuntesAndSeconds(audio.duration);
  audio.addEventListener("timeupdate", () => {
    moveProgressBarWithAudio(audio);
    songStartingTime.innerText = setHoursAndMiuntesAndSeconds(
      audio.currentTime
    );
  });
}
function updateAudio(audio) {
  songBar.addEventListener("click", (e) => {
    moveProgressBarWhenClicking(e, songProgressBar);
    // songProgressBar.parentElement.offsetWidth => to get the width of its parent, because this is
    // the avalible for it to move.
    audio.currentTime =
      (clickedPosition / songProgressBar.parentElement.offsetWidth) *
      audio.duration;
  });
}

// ============================== Activate Sound ==============================
volumeBar.addEventListener("click", (e) => {
  moveProgressBarWhenClicking(e, volumeProgressBar);
  // the range of music.volume => [0,1]
  music.volume = clickedPosition / 100 > 1 ? 1 : clickedPosition / 100;
  quranAudio.volume = clickedPosition / 100 > 1 ? 1 : clickedPosition / 100;
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
    quranAudio.volume = 0;
  } else {
    volumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");

    volumeProgressBar.style.width = `100%`;
    music.volume = 1;
    quranAudio.volume = 1;
  }
});

// ============================== Activate Arrows ==============================
const arrows = Array.from(document.querySelectorAll(".popular__arrows"));

for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    let clicked_arrow = e.target;
    let current_parent = e.currentTarget.parentElement.parentElement;
    let posters = current_parent.querySelector(".popular__posters");

    if (posters.classList.contains("coming-soon")) return;

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

// ============================== Music And Quran Audio Ending  ==============================
function afterEnding(aud) {
  if (mood === "next_song") {
    nextIcon.click();
  } else if (mood === "repeat_song") {
    aud.play();
  } else {
    switch (audioPlayingNow) {
      case "api":
        let randomSurahIndex = Math.floor(Math.random() * 114 + 1);
        quranAudio.src = quranAudio.src.replace(
          /\d+.mp3/g,
          `${randomSurahIndex}.mp3`
        );
        surahs_btn.innerText = surahsNames[randomSurahIndex - 1];
        quranAudio.play();
        pause_icon.classList.replace(
          "bi-play-circle-fill",
          "bi-pause-circle-fill"
        );
        break;

      default:
        let randomNum = Math.floor(Math.random() * 30);
        current = allSongsNames[randomNum] + ".mp3";
        music.src = `audio/${current}`;
        music.play();
        setMasterPlayInfo(current);
        setDefaultStylesForSongs(avalibleSongs);
        setDownloadInfo();
        avalibleSongs.forEach((item) => {
          if (item.dataset.name === current) {
            item.style.border = "2px solid #36e2ec";
            item
              .querySelector(".play-icon")
              .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
          }
        });
        break;
    }
  }
}
music.addEventListener("ended", () => {
  songProgressBar.style.width = `0`;
  afterEnding(music);
});
quranAudio.addEventListener("ended", () => {
  songProgressBar.style.width = `0`;
  afterEnding(quranAudio);
});

// ============================== Activate Search Box ==============================

// with event (change) it executes after hitting -Enter-
// when writing a capital letter using (shift + letter) this means to events so the code below will trigger twice
searchBox.addEventListener("keyup", (e) => {
  resultBox.innerHTML = "";

  // !e.shiftKey => To not trigger the event with shift key
  if (searchBox.value !== "" && !e.shiftKey) {
    const wantedSongs = avalibleSongs.filter((item) =>
      item.dataset.name.toLowerCase().includes(searchBox.value.toLowerCase())
    );

    wantedSongs.forEach((ele) => {
      let resultItem = `
        <div class="player__songs-item player__item searched-song" data-name=${
          ele.dataset.name
        }>
          ${ele.querySelector("img").outerHTML}
          <div>
            ${ele.querySelector("h5").outerHTML}
            <p class="subtitle">${ele.querySelector("p").innerText}</p>
          </div>
          ${ele.querySelector("i").outerHTML}
        </div>`;

      resultBox.innerHTML += resultItem;
    });
    searchedSongs = Array.from(document.querySelectorAll(".searched-song"));
    searchedSongs.forEach((item) => {
      item.addEventListener("click", () => {
        setDefaultStylesForSongs(avalibleSongs);
        if (lovedSurahs) setDefaultStylesForSongs(lovedSurahs);
        playMusic(item);
      });
    });
  } else {
    resultBox.innerHTML = "";
  }
});

// ============================== Set Download Info ==============================
function setDownloadInfo() {
  downloadIcon.href = `audio/${current}`;
  downloadIcon.setAttribute("download", current);
}

// ============================== Activate Heart Icon ==============================
function loveThisSong(answer) {
  if (answer === "yes") {
    btn.classList.add("active");
    btn.querySelector("i").classList.replace("bi-heart", "bi-heart-fill");
  } else {
    btn.classList.remove("active");
    btn.querySelector("i").classList.replace("bi-heart-fill", "bi-heart");
  }
}
btn.addEventListener("click", () => {
  let lovedSurah = avalibleSongs.filter(
    (item) => item.dataset.name === current
  )[0];
  lovedSurah.classList.toggle("loved");
  if (lovedSurah.classList.contains("loved")) {
    loveThisSong("yes");
  } else {
    loveThisSong("no");
  }
});

// ============================== Activate API ==============================
choose_btn.addEventListener("click", () => {
  document.querySelector(".player").style.cssText = `overflow-y: hidden;`;
  document.querySelector(".player__overlay").style.cssText = `
  backdrop-filter: blur(25px);
  z-index: 10;
  position: fixed;
  `;
  document.querySelector(".overlay__inner").style.cssText = `
  visibility: visible;
  top: 0;
  `;
  fetchdata();
  surahsNames.forEach((name) => {
    let surahItem = document.createElement("li");
    surahItem.textContent = name;
    surahs_bx.appendChild(surahItem);
    surahsList.push(surahItem);
  });
});
reciters_btn.addEventListener("click", () => {
  recitersList.classList.toggle("active");
  surahs_bx.classList.remove("active");
  if (document.querySelector(".icon-bx p"))
    document.querySelector(".icon-bx p").remove();
  all_options.forEach((item) => {
    item.addEventListener("click", () => {
      surahs_btn.classList.remove("disabled");
      reciters_btn.innerText = item.innerText;
      recitersList.classList.remove("active");
      data.forEach((reciterObj) => {
        if (reciterObj.englishName === item.innerText) {
          reciterName = reciterObj.identifier;
        }
      });
    });
  });
});
surahs_btn.addEventListener("click", (e) => {
  if (surahs_btn.classList.contains("disabled")) {
    e.preventDefault();
  } else {
    surahs_bx.classList.toggle("active");
    recitersList.classList.remove("active");
    if (document.querySelector(".icon-bx p"))
      document.querySelector(".icon-bx p").remove();
    surahsList.forEach((item, index) => {
      item.addEventListener("click", () => {
        music.pause();
        songProgressBar.style.width = `0`;
        surahs_btn.innerText = item.innerText;
        surahIndex = index + 1;
        surahs_bx.classList.remove("active");
        quranAudio.src = `https://cdn.islamic.network/quran/audio-surah/128/${reciterName}/${surahIndex}.mp3`;
        document.querySelector(".loading-icon").style.opacity = "1";
        pause_icon.style.opacity = "0";
        pause_icon.classList.replace(
          "bi-play-circle-fill",
          "bi-pause-circle-fill"
        );
        quranAudio.play();
      });
    });
  }
});
pause_icon.addEventListener("click", () => {
  if (pause_icon.classList.contains("bi-pause-circle-fill")) {
    pause_icon.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
    startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
    quranAudio.pause();
  } else {
    pause_icon.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
    startPlayingIcon.classList.replace("bi-play-fill", "bi-pause-fill");
    quranAudio.play();
  }
});
quranAudio.addEventListener("error", () => {
  document.querySelector(".loading-icon").style.opacity = "0";
  document.querySelector(".pause-icon").style.opacity = "0";
  startPlayingIcon.classList.replace("bi-pause-fill", "bi-play-fill");
  error_msg = `<p>Sorry, Not Avalible For This Reciter</p>`;
  if (!document.querySelector(".icon-bx p")) document.querySelector(".icon-bx").innerHTML += error_msg;
  masterPlayHeading.innerText = 'Not Available';
  mainHeading.innerText = 'Not Available';
});
async function fetchdata() {
  let responde = await fetch(
    "https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json"
  );
  data = await responde.json();
  for (let reciter of data) {
    let reciterItem = document.createElement("li");
    reciterItem.textContent = reciter.englishName;
    recitersList.appendChild(reciterItem);
    all_options.push(reciterItem);
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".player__overlay").style.cssText = `
    backdrop-filter: blur(0);
    z-index: -1
    `;
    document.querySelector(".player").style.cssText = `overflow-y: auto;`;
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("player__overlay")) {
    document.querySelector(".player__overlay").style.cssText = `
    backdrop-filter: blur(0);
    z-index: -1
    `;
    document.querySelector(".player").style.cssText = `overflow-y: auto;`;
  }
});
