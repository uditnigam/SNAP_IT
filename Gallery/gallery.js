const galleryPageBackBtn = document.querySelector(".gallery-container-back-btn");
const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const galleryFilter = document.querySelector(".btn-group");

let input = false;

galleryPageBackBtn.addEventListener("click", (e) => {
    window.location.href = "/homepage.html";
})

setTimeout(function () {
    displayData();
}, 100);

searchIcon.addEventListener("click", (e) => {
    if (input) {
        searchInput.style.display = "none";
        input = !input;
    }
    else {
        searchInput.style.display = "flex";
        input = !input;
        searchInput.focus();
    }
});


galleryFilter.addEventListener("change", (e) => {
    const mediaContainer = document.querySelectorAll(".media-container");
    // console.log(mediaContainer)
    const filterValue = e.target.id;
    // console.log(filterValue);
    if (mediaContainer) {
        // console.log("a")
        if (filterValue === "all") {
            mediaContainer.forEach((e) => {
                // console.log(e)
                e.style.display = "flex";
            })
        }
        else {
            mediaContainer.forEach((e) => {
                console.log(e.classList[1])
                console.log(filterValue)
                if (filterValue === e.classList[1]) {
                    console.log(e.classList)
                console.log(filterValue)
                    e.style.display = "flex";
                } else {
                    e.style.display = "none";
                }
            })
        }
    }
})