const cameraPageBackBtn = document.querySelector(".camera-container-back-btn");
const galleryOpenButton = document.querySelector(".gallery-open-button");
const insideActionContainer = document.querySelectorAll(".action-container>*");
const actionContainer = document.querySelector(".action-container");
const stopPauseContainer = document.querySelector(".stop-pause-container");
const pauseButton = document.querySelector(".pause-button");
const stopButton = document.querySelector(".stop-button");
const cameraCaptureBtn = document.querySelector(".camera-click-button");
const videoRecordBtn = document.querySelector(".video-record-button");
const videoContainer = document.querySelector(".video-container");
const timerCont = document.querySelector(".timer-cont");
const messageCont = document.querySelector(".message-cont");
const settingOpenBtn = document.querySelector(".setting-open-button");
const mainContainer = document.querySelector(".main-container");
const settingCloseIcon = document.querySelector(".setting-close-icon");

const video = document.querySelector(".video");

let zoomLevel = 1;
let cameraTimer = 0;
let data = [];
let videoTimer = 0;
let interval;
const constraints = {
  audio: false,
  video: true,
};

const videoState = {
  recordState: false,
  pauseState: false,
  message: "",
};

//ON CLICK OF BACK BUTTON ON CAMERA PAGE, PAGE NAVIGATES TO THE HOMEPAGE
cameraPageBackBtn.addEventListener("click", (e) => {
  window.location.href = "/SNAP_IT/index.html";
});
//ON CLICK OF GALLERY OPEN BUTTON ON CAMERA PAGE, PAGE NAVIGATES TO THE GALLERY
galleryOpenButton.addEventListener("click", (e) => {
  window.location.href = "/SNAP_IT/Gallery/gallery.html";
});

//Creating a functionality to promt for  permission and open the device's camera if it is available
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    // const audioTrack = stream.getAudioTracks();
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.addEventListener("stop", function () {
      createDataUrl("video");
    });
  })
  .catch((error) => {
    console.log(error);
  });

cameraCaptureBtn.addEventListener("click", (e) => {
  if (cameraTimer > 0) {
    setTimeout(function () {
      captureImage();
      cameraTimer = 0;
    }, (cameraTimer + 1) * 1000);
    countdownTimer();
  } else {
    captureImage();
    console.log("0");
  }
  timerCont.innerHTML = "";
});
//Function Countdown Timer
function countdownTimer() {
  let timeleft = cameraTimer;
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").style.display = "none";
    } else {
      document.getElementById("countdown").style.display = "flex";
      document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}
function captureImage() {
  const canvas = document.createElement("canvas");
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  const tool = canvas.getContext("2d");
  insideActionContainer.forEach((ele) => {
    ele.classList.remove("activeBtn");
  });
  cameraCaptureBtn.classList.add("activeBtn");
  video.classList.add("camera-blink");
  setTimeout(() => {
    video.classList.remove("camera-blink");
  }, 200);
  tool.filter = newFilter;
  tool.scale(zoomLevel, zoomLevel);
  let x = (canvas.width / zoomLevel - canvas.width) / 2;
  let y = (canvas.width / zoomLevel - canvas.height) / 2;
  tool.drawImage(video, x, y);

  createDataUrl("camera", canvas);
}

videoRecordBtn.addEventListener("click", (e) => {
  if (cameraTimer == 3) {
    setTimeout(function () {
      videoRecording();
      console.log("3");
    }, 4000);
    countdownTimer();
  } else if (cameraTimer == 5) {
    setTimeout(function () {
      videoRecording();
      console.log("5");
    }, 6000);
    countdownTimer();
  } else if (cameraTimer == 10) {
    setTimeout(function () {
      videoRecording();
      console.log("10");
    }, 11000);
    countdownTimer();
  } else {
    videoRecording();
    console.log("0");
  }
});

function videoRecording() {
  if (videoState.recordState === false) {
    insideActionContainer.forEach((ele) => {
      ele.classList.remove("activeBtn");
    });
    videoRecordBtn.classList.add("activeBtn");
    initialTimer();
    pauseButton.addEventListener("click", pauseRecording);
    stopButton.addEventListener("click", stopRecording);
  }
  startRecording();
}

function startRecording() {
  console.log("start videoState: ", videoState);
  if (videoState.recordState === true && videoState.pauseState === false) {
    stopPauseContainer.style.display = "flex";
    actionContainer.style.display = "none";
    startTimer();
    recorder.start();

    videoState.recordState = false;
    videoState.pauseState = true;
    console.log("start videoState: ", videoState);
  } else {
    videoState.recordState = true;
    videoState.pauseState = false;
  }
}

function pauseRecording() {
  clearInterval(interval);
  // videoState.recordState = true;
  // console.log("pause videoState: ", videoState)
  if (videoState.pauseState === false) {
    const resumedMsgBox = document.createElement("div");
    resumedMsgBox.setAttribute("class", "resumed-message-box");
    resumedMsgBox.innerHTML = `
            <div class="timer">Resumed</div>
      `;
    messageCont.appendChild(resumedMsgBox);
    setTimeout(function () {
      messageCont.removeChild(resumedMsgBox);
    }, 2000);
    // videoState.pauseState = true;
    // videoState.pauseState = true;
  } else {
    const pausedMsgBox = document.createElement("div");
    pausedMsgBox.setAttribute("class", "paused-message-box");
    pausedMsgBox.innerHTML = `
                <div class="timer">Paused</div>
          `;
    messageCont.appendChild(pausedMsgBox);
    setTimeout(function () {
      messageCont.removeChild(pausedMsgBox);
    }, 2000);
    // videoState.pauseState = false;
  }
  startRecording();
}

function stopRecording() {
  stopPauseContainer.style.display = "none";
  actionContainer.style.display = "flex";
  clearTimeout(interval);
  recorder.stop();
  timerCont.innerHTML = "";
  timerTime = 0;
  cameraCaptureBtn.classList.add("activeBtn");
  video.classList.add("camera-blink");
  setTimeout(() => {
    video.classList.remove("camera-blink");
  }, 200);
}

function startTimer() {
  interval = setInterval(countUpTimer, 1000);
  function countUpTimer() {
    videoTimer++;
    const numberMinutes = Math.floor(videoTimer / 60);
    const numberSeconds = videoTimer % 60;
    const timerContainer = document.createElement("div");
    timerContainer.setAttribute("class", "timer-box");
    timerContainer.innerHTML = `
            <div class="red_circle"></div>
            <div class="timer">${pad(numberMinutes)} : ${pad(
      numberSeconds
    )}</div>
      `;
    timerCont.appendChild(timerContainer);
  }
  const pad = (number) => {
    return number < 10 ? "0" + number : number;
  };
}

function initialTimer() {
  const initialTimerContainer = document.createElement("div");
  initialTimerContainer.setAttribute("class", "initial-timer-box");
  initialTimerContainer.innerHTML = `
            <div class="red_circle"></div>
            <div class="timer">00:00</div>
      `;
  timerCont.appendChild(initialTimerContainer);
}

//Function to create image and video url
function createDataUrl(type, canvas) {
  const date = currentDate();
  if (type === "camera") {
    const name = "Image_" + Date.now();
    const link = canvas.toDataURL();
    addData(link, "img", name, date);
  } else {
    const name = "Video_" + Date.now();
    let blob = new Blob(data, { type: "video/mp4" });
    addData(blob, "video", name, date);
    data = [];
  }
}

//Function to Get the current Date
function currentDate() {
  const date = new Date();
  const str =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return str;
}
