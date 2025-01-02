/* ----------- Area for Declare Variable ------------- */

// music-player
const musicContainer = document.querySelector(".player-dock");

// control button
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

// audio element
const audio = document.querySelector("#audio");

// progress element
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");

// volume element
const volumeContainer = document.querySelector(".volume-maxsize");
const volumeSize = document.querySelector(".volume-size");
const volIcon = document.querySelector("#volume");

// metadata
const title = document.querySelector("#title");
const artistTitle = document.querySelector("#artist");
const cover = document.querySelector("#cover");

// white/dark icon
const wdIcon = document.querySelector("#whitemode");
const body = document.querySelector("body");

// Homepage buttom
function gotoHome() {
  window.open("/", "_self");
}
function gotoAbout() {
  window.open("/about.html", "_self");
}

/* --------------------- INDEX SCRIPT ------------------------- */
/* -------- Functions for Music Player --------- */
// Default track of songs
let songIndex = 1;
let artistIndex = 1;

// Initially load song info DOM
loadSong(songs[songIndex]);
loadArtist(artists[artistIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./img/${song}.jpg`;
}

function loadArtist(artist) {
  artistTitle.innerText = artist;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Change song
function prevSong() {
  songIndex--;
  artistIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
    artistIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  loadArtist(artists[artistIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  artistIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
    artistIndex = 0;
  }

  loadSong(songs[songIndex]);
  loadArtist(artists[artistIndex]);
  playSong();
}

// Pick song
function pickSong(Index) {
  loadSong(songs[Index]);
  loadArtist(artists[Index]);
  songIndex = Index;
  artistIndex = Index;
  playSong();
}

// ================= Random songs ====================


function randomSongs() {
  let corlo = document.getElementById("random");
  let r = Math.floor(Math.random() * songs.length);
  loadSong(songs[r]);
  loadArtist(artists[r]);
  songIndex = r;
  artistIndex = r;
  playSong();
}

let randomBtn = document.getElementById("random");
randomBtn.addEventListener("click", ()=>{
  const isPlaying = musicContainer.classList.contains("play");
  if(isPlaying){
    randomSongs();
  }
})

// ================= Loop Songs ======================

function unLoop() {
  let replay = document.getElementById("audio");
  let corl = document.getElementById("loop");
  corl.style.color = "white";
  replay.loop = false;
}

function loopSongs() {
  let replay = document.getElementById("audio");
  let corl = document.getElementById("loop");
  replay.loop = true;
  corl.style.color = "#ff6b81";
}

let loopBtn = document.getElementById("loop");
loopBtn.addEventListener("click", () => {
  let replay = document.getElementById("audio").loop;
  if (replay) {
    unLoop();
  } else {
    loopSongs();
  }
})

// Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Audio Volume
audio.volume = 0.7;
volumeSize.style.width = "70%";

function volDown() {
  volIcon.querySelector("i.fas").classList.remove("fa-volume-up");
  volIcon.querySelector("i.fas").classList.add("fa-volume-down");
}

function volUp() {
  volIcon.querySelector("i.fas").classList.add("fa-volume-up");
  volIcon.querySelector("i.fas").classList.remove("fa-volume-down");
}

function setVolume(e) {
  let currentVol = audio.volume;
  const width = this.clientWidth;
  const clickX = e.offsetX;

  currentVol = (clickX / width) * 1.0;
  audio.volume = currentVol;
  const volPercent = (currentVol / 1.0) * 100;
  volumeSize.style.width = `${volPercent}%`;

  if (currentVol <= 0.6) {
    volDown();
  } else {
    volUp();
  }
}

// Player's Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
volumeContainer.addEventListener("click", setVolume);
audio.addEventListener("ended", nextSong);

// white mode

if (localStorage.getItem("whiteStatus")) {
  wdIcon.querySelector("i.far").classList.remove("fa-moon");
  wdIcon.querySelector("i.far").classList.add("fa-sun");
  body.classList.remove("dark");
  body.classList.add("white");
}

wdIcon.addEventListener("click", function () {
  if (localStorage.getItem("whiteStatus")) {
    wdIcon.querySelector("i.far").classList.remove("fa-sun");
    wdIcon.querySelector("i.far").classList.add("fa-moon");
    body.classList.remove("white");
    body.classList.add("dark");
    localStorage.removeItem("whiteStatus");
  } else {
    // wdIcon.querySelector("i.fas").classList.remove("fa-moon");
    wdIcon.querySelector("i.far").classList.remove("fa-moon");
    wdIcon.querySelector("i.far").classList.add("fa-sun");
    body.classList.remove("dark");
    body.classList.add("white");
    localStorage.setItem("whiteStatus", "true");
  }
});

// append search mobile
// let searchBar = document.querySelector(".search-bar");
// let searchInput = document.querySelector("#myInput");
// let searchIcon = document.querySelector("#searchIcon");
// searchBar.addEventListener("click", () => {
//   searchBar.style.transition = "0.25s";
//   searchIcon.style.display = "none";
//   searchBar.style.borderRadius = "20px";
//   setTimeout(() => {
//     searchBar.style.padding = "0 0 0 20px";
//   }, 100);
//   setTimeout(() => {
//     searchBar.style.width = "172px";
//   }, 100);
//   searchInput.style.display = "inline";
//   searchInput.style.width = "70%";
//   setTimeout(() => {
//     searchIcon.style.display = "block";
//     searchIcon.style.padding = "12px 20px";
//   }, 500);
// });

// autosuggestion for search features

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].includes(val)) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.className = "item";
        /*make the matching letters bold:*/
        b.innerHTML = arr[i].substr(0, val.length);
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          for (let i = 0; i < songs.length; i++) {
            if (inp.value === songs[i]) {
              pickSong(i);
            }
          }
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    let x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("myInput"), songs);

// append player
let musicPlayer = document.querySelector("#musicPlayer");
let showPlayer = document.querySelector(".show-player");
let hidePlayer = document.querySelector(".hide-player");
let volControl = document.querySelector(".control-volume");
let randOpt = document.querySelector("#random");
let loopOpt = document.querySelector("#loop");
let metaInfo = document.querySelector(".meta-info");

function appendPlayer() {
  musicPlayer.style.height = "45%";
  musicPlayer.style.top = "50%";
  musicPlayer.style.padding = "15px 10px";
  musicPlayer.style.display = "block";

  setTimeout(() => {
    title.style.width = "200px";
    artistTitle.style.width = "200px";
    showPlayer.style.display = "none";
    hidePlayer.style.display = "inline";
    progressContainer.style.display = "block";
    progressContainer.style.width = "90%";
    progress.style.display = "block";
    volControl.style.display = "flex";
    volControl.style.position = "absolute";
    volControl.style.right = "10%";
    prevBtn.style.display = "inline";
    nextBtn.style.display = "inline";
    randOpt.style.display = "inline";
    loopOpt.style.display = "inline";
  }, 200);
}

function removePlayer() {
  title.style.width = "100%";
  artistTitle.style.width = "100%";
  hidePlayer.style.display = "none";
  showPlayer.style.display = "inline";
  progressContainer.style.display = "none";
  progressContainer.style.width = "100%";
  progress.style.display = "none";
  volControl.style.display = "none";
  volControl.style.position = "absolute";
  volControl.style.right = "0";
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  randOpt.style.display = "none";
  loopOpt.style.display = "none";

  setTimeout(() => {
    musicPlayer.style.height = "60px";
    musicPlayer.style.top = "90%";
    musicPlayer.style.padding = "0px 0px";
    musicPlayer.style.display = "flex";
  }, 200);
}



