const cameraPageBackBtn = document.querySelector(".camera-container-back-btn");
const galleryOpenButton = document.querySelector(".gallery-open-button");
const insideActionContainer = document.querySelectorAll(".action-container>*")
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
const settingCloseBtn = document.querySelector(".setting-close-button");
const video = document.querySelector(".video");

let data = [];
console.log("data", data)
let timerTime = 0;
let interval;
const constraints = {
    audio: false,
    video: true
};
const videoState = {
    recordState: false,
    pauseState: false,
    message: ''
};

//ON CLICK OF BACK BUTTON ON CAMERA PAGE, PAGE NAVIGATES TO THE HOMEPAGE
cameraPageBackBtn.addEventListener("click", (e) => {
    window.location.href = "/homepage.html";
});
//ON CLICK OF GALLERY OPEN BUTTON ON CAMERA PAGE, PAGE NAVIGATES TO THE GALLERY
galleryOpenButton.addEventListener("click", (e) => {
    window.location.href = "/Gallery/gallery.html";
});

//Creating a functionality to promt for  permission and open the device's camera if it is available
navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        // const audioTrack = stream.getAudioTracks();
        video.srcObject = stream;

        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => data.push(event.data);
        recorder.addEventListener("stop", function () {
            createDataUrl("video");
        })
    })
    .catch((error) => {
        console.log(error)
    });

cameraCaptureBtn.addEventListener("click", (e) => {
    const canvas = document.createElement("canvas");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    const tool = canvas.getContext("2d");
    insideActionContainer.forEach((ele) => {
        ele.classList.remove("activeBtn");
    })
    cameraCaptureBtn.classList.add("activeBtn");

    let x = (canvas.width - canvas.width) / 2;
    let y = (canvas.width - canvas.height) / 2;
    tool.drawImage(video, x, y);

    createDataUrl("camera", canvas);
});

videoRecordBtn.addEventListener("click", (e) => {
    if (videoState.recordState === false) {
        insideActionContainer.forEach((ele) => {
            ele.classList.remove("activeBtn");
        })
        videoRecordBtn.classList.add("activeBtn");
        initialTimer();
        pauseButton.addEventListener("click", pauseRecording);
        stopButton.addEventListener("click", stopRecording);
    }
    startRecording();
})

function startRecording() {
    if (videoState.recordState === true && videoState.pauseState === false) {
        stopPauseContainer.style.display = "flex";
        actionContainer.style.display = "none";
        startTimer();
        recorder.start();

        videoState.recordState = false;
        videoState.pauseState = true;

    } else {

        videoState.recordState = true;
        videoState.pauseState = false;
    }
};

function pauseRecording() {
    clearInterval(interval);
    videoState.recordState = true;
    if (videoState.pauseState === false) {
        const resumedMsgBox = document.createElement("div");
        resumedMsgBox.setAttribute("class", "resumed-message-box");
        resumedMsgBox.innerHTML = `
            <div class="timer">Resumed</div>
      `;
        messageCont.appendChild(resumedMsgBox);
        setTimeout(function () { messageCont.removeChild(resumedMsgBox); }, 2000);
    } else {
        const pausedMsgBox = document.createElement("div");
        pausedMsgBox.setAttribute("class", "paused-message-box");
        pausedMsgBox.innerHTML = `
                <div class="timer">Paused</div>
          `;
        messageCont.appendChild(pausedMsgBox);
        setTimeout(function () { messageCont.removeChild(pausedMsgBox); }, 2000);
    }
    startRecording();
};

function stopRecording() {
    stopPauseContainer.style.display = "none";
    actionContainer.style.display = "flex";
    clearTimeout(interval);
    recorder.stop();
    timerCont.innerHTML = "";
    timerTime = 0;
};

function startTimer() {
    interval = setInterval(countUpTimer, 1000);
    function countUpTimer() {
        timerTime++;
        const numberMinutes = Math.floor(timerTime / 60);
        const numberSeconds = timerTime % 60;
        const timerContainer = document.createElement("div");
        timerContainer.setAttribute("class", "timer-box");
        timerContainer.innerHTML = `
            <div class="red_circle"></div>
            <div class="timer">${pad(numberMinutes)} : ${pad(numberSeconds)}</div>
      `;
        timerCont.appendChild(timerContainer);
    }
    const pad = (number) => {
        return (number < 10) ? '0' + number : number;
    }
};

function initialTimer() {
    const initialTimerContainer = document.createElement("div");
    initialTimerContainer.setAttribute("class", "initial-timer-box");
    initialTimerContainer.innerHTML = `
            <div class="red_circle"></div>
            <div class="timer">00:00</div>
      `;
    timerCont.appendChild(initialTimerContainer);
};

//Function to create image and video url
function createDataUrl(type, canvas) {
    const date = currentDate();
    if (type === "camera") {
        const name = "image_" + Date.now();
        const link = canvas.toDataURL();
        addData(link, "img", name, date);
    } else {
        const name = "video_" + Date.now();
        let blob = new Blob(data, { type: 'video/mp4' });
        addData(blob, "video", name, date);
        data = [];
    }
};

//Function to Get Date
function currentDate() {
    const date = new Date();
    const str = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return str;
}

//Function to open and close the Settings Toolbar Panel
settingOpenBtn.addEventListener("click", (e) => {
    openNav();
});
function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
};
settingCloseBtn.addEventListener("click", (e) => {
    closeNav();
});
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.getElementById("mySidenav").style.width = "0";
    }
})
