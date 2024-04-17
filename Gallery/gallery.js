const galleryPageBackBtn = document.querySelector(".gallery-container-back-btn");

galleryPageBackBtn.addEventListener("click", (e) => {
    window.location.href = "/homepage.html";
})

setTimeout(function () {
    displayData();
}, 100);