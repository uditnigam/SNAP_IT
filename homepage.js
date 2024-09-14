const cameraBtn = document.querySelector(".right-container-camera-btn");
const screenRecordingBtn = document.querySelector(
  ".right-container-screen-recording-btn"
);
const galleryBtn = document.querySelector(".right-container-gallery-btn");

cameraBtn.addEventListener("click", (e) => {
  window.location.href = "/SNAP_IT/Camera/camera.html";
});

galleryBtn.addEventListener("click", (e) => {
  window.location.href = "/SNAP_IT/Gallery/gallery.html";
});

const displayMediaOptions = {
  video: {
    displaySurface: "screen",
  },
};
let data = [];
let recordState = false;
let mediaRecorder;
screenRecordingBtn.addEventListener("click", async function (e) {
  await navigator.mediaDevices
    .getDisplayMedia(displayMediaOptions)
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener("dataavailable", (e) => {
        data.push(e.data);
      });
      mediaRecorder.addEventListener("stop", (e) => {
        createDataUrl();
      });
    })
    .catch(function (err) {
      console.log(err);
    });

  if (recordState == false) {
    mediaRecorder.start();
    recordState = true;
  } else {
    mediaRecorder.stop();
    recordState = false;
  }
});

function createDataUrl() {
  const date = currentDate();
  const name = "Screen_" + Date.now();
  let blob = new Blob(data, { type: "screen/mp4" });
  addData(blob, "screen", name, date);
  data = [];
}

//Function to Get Date
function currentDate() {
  const date = new Date();
  const str =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return str;
}
