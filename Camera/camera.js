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

let buffer = [];
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
        let videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks();
        video.srcObject = stream;
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
    console.log("start")
    if (videoState.recordState === true && videoState.pauseState === false) {
        stopPauseContainer.style.display = "flex";
        actionContainer.style.display = "none";
        startTimer();
        const resumedMsgBox = document.createElement("div");
        resumedMsgBox.setAttribute("class", "resumed-message-box");
        resumedMsgBox.innerHTML = `
            <div class="timer">Resumed</div>
      `;
        messageCont.appendChild(resumedMsgBox);
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
    startRecording();
    if (videoState.pauseState === false) {
        const pausedMsgBox = document.createElement("div");
        pausedMsgBox.setAttribute("class", "paused-message-box");
        pausedMsgBox.innerHTML = `
                <div class="timer">Paused</div>
          `;
        messageCont.appendChild(pausedMsgBox);
    }
};

function stopRecording() {
    stopPauseContainer.style.display = "none";
    actionContainer.style.display = "flex";
    clearTimeout(interval);
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
    const uid = generateUID();
    const date = currentDate();
    if (type === "camera") {
        const name = "image_" + uid;
        const link = canvas.toDataURL();
        addData(uid, link, "img", name, date);
    } else {
        const name = "video_" + uid;
        const blob = new Blob(buffer, { type: 'video/mp4' });
        addData(uid, blob, "video", name, date);
        buffer = [];
    }
};

//Function to Get Date
function currentDate() {
    const date = new Date();
    const str = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return str;
}

//To generate random unique id
function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
};







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
