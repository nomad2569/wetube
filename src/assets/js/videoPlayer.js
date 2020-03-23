import getBlobDuration from "get-blob-duration";

const videoContainer = document.querySelector(".videoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const videoController = document.getElementsByClassName(
  "videoPlayer__controls"
);
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const progressBar = document.querySelector(".videoPlayer__progress");
const progressBarWrapper = document.querySelector(".progress-wrapper");

const registerView = (req, res) => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handlePlayClick(event) {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function goFullScreen() {
  videoContainer.webkitRequestFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

function exitFullScreen() {
  document.webkitExitFullScreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);
}
const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  const duration = await getBlobDuration(blob);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 100);
}

function disappearControl(event) {
  const movement = event.movementX + event.movementY;
  setTimeout(() => {
    if (movement < 100) {
      videoController.classList.add("noCursor");
      videoContainer.classList.add("zeroOpacity");
    }
  }, 2000);

  videoController.classList.remove("noCursor");
  videoContainer.classList.remove("zeroOpacity");
}

function handleSpace(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    handlePlayClick();
  }
}

async function changeCurrentTime(event) {
  handlePlayClick();

  const blob = await fetch(videoPlayer.src).then(response => response.blob());
  const duration = await getBlobDuration(blob);
  const scrubTime = (event.offsetX / progressBar.offsetWidth) * duration;
  videoPlayer.currentTime = scrubTime;
  handlePlayClick();
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
  progressBar.value = videoPlayer.currentTime / videoPlayer.duration;
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("finished", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  videoPlayer.addEventListener("ended", handleEnded);
  progressBar.addEventListener("click", changeCurrentTime);
  //videoPlayer.addEventListener("mousemove", disappearControl);

  document.addEventListener("keydown", handleSpace);
}

if (videoContainer) {
  init();
}
