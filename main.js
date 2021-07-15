const btnNewGoal = document.querySelector("#buttonNewGoal");
btnNewGoal.addEventListener("click", addNewGoal);
//Web Audio API
const audioContext = new AudioContext();
const audio = document.querySelector("audio");
const track = audioContext.createMediaElementSource(audio);
track.connect(audioContext.destination);
// border flash
window.setInterval(borderColor, 1000);

let targetText = null;

function addNewGoal() {
  let goal = document.querySelector("input");
  if (goal.value.trim() === "") document.querySelector("button").click();
  else {
    let pendingGoal = document.querySelector(".list-left > ul");
    let li = document.createElement("li");
    li.className = "list-group-item li-left";
    // drag api
    li.draggable = true;
    li.addEventListener("dragstart", drag, false);
    li.addEventListener("drop", drop, false);
    li.addEventListener("dragend", dragEnd, false);
    li.addEventListener("dragover", dragOver, false);
    li.addEventListener("dragenter", dragEnter, false);
    li.addEventListener("dragleave", dragLeave, false);
    // retrive text from input
    let span = document.createElement("span");
    span.innerText = goal.value;
    li.appendChild(span);
    // reset input
    goal.value = "";
    let div = document.createElement("div");
    div.className = "d-grid gap-2 d-md-flex justify-content-md-end";
    // configure complete btn
    let btnCplt = document.createElement("button");
    btnCplt.type = "button";
    btnCplt.className = "btn btn-outline-success";
    btnCplt.innerHTML = "<i class='bi bi-check-circle-fill'></i> Complete";
    btnCplt.onclick = completeGoal;
    // configure delete button
    let btnDlt = document.createElement("button");
    btnDlt.type = "button";
    btnDlt.className = "btn btn-outline-danger";
    btnDlt.innerHTML = "<i class='bi bi-x-circle-fill'></i>";
    btnDlt.onclick = removeGoal;
    //add elements DOM
    pendingGoal.appendChild(li);
    li.appendChild(div);
    div.appendChild(btnCplt);
    div.appendChild(btnDlt);
    //play audio
    audioContext.resume().then(() => {
      audio.src = "sound/goal.mp3";
      audio.play();
    });
  }
}

function completeGoal() {
  let completion = document.querySelector(".list-right > ul");
  let li = this.parentElement.parentElement;
  li.className = "list-group-item li-right";
  // remove complete button
  this.remove();
  completion.appendChild(li);
  //play audio
  audioContext.resume().then(() => {
    audio.src = "sound/complete.mp3";
    audio.play();
  });
}

function removeGoal() {
  this.parentElement.parentElement.remove();
  //play audio
  audioContext.resume().then(() => {
    audio.src = "sound/delete.mp3";
    audio.play();
  });
}

function borderColor() {
  document.querySelector(
    ".content"
  ).style.borderColor = `rgb(${randomInt()}, ${randomInt()}, ${randomInt()})`;
}

function randomInt() {
  return Math.floor(Math.random() * 256);
}

function drag(event) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text", this.querySelector("span").innerText);
  this.style.opacity = "0.4";
}

function dragEnd(event) {
  this.style.opacity = "1";
  if (targetText != null) this.querySelector("span").innerText = targetText;
}

function drop(event) {
  event.preventDefault();
  let draggedText = event.dataTransfer.getData("text");
  targetText = this.querySelector("span").innerText;
  this.querySelector("span").innerText = draggedText;
  this.style.borderStyle = "";
  //play audio
  audioContext.resume().then(() => {
    audio.src = "sound/switch.mp3";
    audio.play();
  });
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  this.style.borderStyle = "dotted";
}

function dragLeave(event) {
  this.style.borderStyle = "";
}

// creates an <iframe> 
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
    videoId: "rA56B4JyTgI",
    playerVars: { 'autoplay': 1},
    events: {
        //add event linstener
        'onStateChange': onPlayerStateChange,
    }
    });
}

function onPlayerStateChange(event) {
    if (event.data == 0) {
        player.playVideo(); // replay video
    } else if (event.data == 1) {
        videoControl.textContent = "Pause"; // change button text to Pause when playing
    } else if (event.data == 2) {
        videoControl.textContent = "Play"; // change button text to Pause when video pauses
    }
}

function restartVideo(event) {
    //restart video
    player.seekTo(0);
}
function controllVideo(event) {
  switch (player.getPlayerState()) {
    case 1:
      player.pauseVideo(); //pause video if video is playing
      break;
    case 2:
      player.playVideo(); //play video if video is paused
      break;
    case -1:
      player.playVideo(); //play video if video has not started yet
  }
}

//add event listener to reset button
var restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartVideo);

//add event listener to video control button
var videoControl = document.getElementById("videoControl");
videoControl.addEventListener("click", controllVideo);
