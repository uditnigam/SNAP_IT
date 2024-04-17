const cameraBtn = document.querySelector(".right-container-camera-btn");
const screenBtn = document.querySelector(".right-container-screen-btn");
const galleryBtn = document.querySelector(".right-container-gallery-btn");



cameraBtn.addEventListener("click", (e) => {
    window.location.href = "/Camera/camera.html";
})

screenBtn.addEventListener("click", (e) => {
    window.location.href = "/Screen/screen.html";
})

galleryBtn.addEventListener("click", (e) => {
    window.location.href = "/Gallery/gallery.html";
})

