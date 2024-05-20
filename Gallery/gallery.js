const galleryPageBackBtn = document.querySelector(".gallery-container-back-btn");
const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const galleryFilter = document.querySelector(".btn-group");
const loader = document.querySelector(".page-loader");
let imgVar = 0;
let videoVar = 0;
let screenVar = 0;
let input = false;

galleryPageBackBtn.addEventListener("click", (e) => {
    window.location.href = "/homepage.html";
})

setTimeout(function () {
    loader.style.display = "none";
    getMediaCardsFromDatabase();
    galleryDataInformation();
}, 1000);

function getMediaCardsFromDatabase() {
    galleryData.forEach((data) => {
        mediaContainerOfGallery(data.uid, data.type, data.link, data.date, data.name);
    })
};

//Creating Media Cards to display in Gallery
function mediaContainerOfGallery(id, type, link, date, name) {
    const galleryContainer = document.querySelector(".gallery-container");
    const mediaContainer = document.createElement("div");
    mediaContainer.setAttribute("class", "media-container");
    mediaContainer.setAttribute("uid", id);
    if (type === "img") {
        mediaContainer.classList.add("image");
        mediaContainer.innerHTML = `
            <div class="top-buttons">
                <i class="bi bi-x-circle-fill cross"></i>
                <i class="bi bi-file-arrow-down-fill download-button"></i>
            </div>
            <img class="image" src="${link}" name="${name}"></img>
            <div class="card-button">
                <div class="media-name">${name}</div>
                <i class="bi bi-pencil-fill edit-button"></i>
            </div>`
    } else {
        type == "screen" ?
            mediaContainer.classList.add("screen") :
            mediaContainer.classList.add("video");
        mediaContainer.innerHTML = `
            <div class="top-buttons">
                <i class="bi bi-x-circle-fill cross"></i>
                <i class="bi bi-file-arrow-down-fill download-button"></i>
            </div>
            <video class="video"></video>
            <div class="card-button">
                <div class="media-name" contenteditable="false">${name}</div>
                <i class="bi bi-pencil-fill edit-button"></i>
            </div>`;
        const videoDisplayCont = mediaContainer.querySelector(".video");
        videoDisplayCont.src = window.URL.createObjectURL(link);
        videoDisplayCont.autoplay = true;
        videoDisplayCont.controls = true;
        videoDisplayCont.loop = true;
    }
    galleryContainer.appendChild(mediaContainer);
    mediaContainer.addEventListener("click", (e) => {
        cardButton(e, mediaContainer);
    })
    return mediaContainer;
};
//Functionality of buttons on Media Cards to delete, download and edit it. 
function cardButton(e, mediaContainer) {
    if (e.target.classList.contains("cross")) {
        mediaContainer.remove();
        deleteMedia(e);
    }
    if (e.target.classList.contains("download-button")) {
        const name = e.target.parentNode.parentNode.children[2].children[0].innerText;
        const target = e.currentTarget;
        downloadMedia(target, name);
    }
    if (e.target.classList.contains("edit-button")) {
        const mediaName = e.target.parentNode.children[0];
        editName(mediaName, e);
    }
};

//Functionality of edit name button.
function editName(mediaName, event) {
    const uid = Number(event.target.parentNode.parentNode.getAttribute("uid"));
    mediaName.contentEditable = "true";
    mediaName.focus();
    mediaName.addEventListener("blur", (e) => {
        const name = e.target.innerText;
        mediaName.innerText = name;
        updateData(mediaName.innerText, uid);
        mediaName.contentEditable = "false";
    })
    mediaName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const name = e.target.innerText;
            mediaName.innerText = name;
            mediaName.contentEditable = "false";
        }
        updateData(mediaName.innerText, uid);
    })
};

//Functionality of download media button.
function downloadMedia(event, mediaName) {
    const mediaLink = document.createElement("a");
    mediaLink.href = event.children[1].src;
    if (event.children[1].nodeName == "IMG") {
        mediaLink.download = mediaName + ".png"
    } else {
        mediaLink.download = mediaName + ".mp4"
    }
    mediaLink.click();
    mediaLink.remove();
};

function galleryDataInformation() {
    let galleryDataInfo = document.querySelector(".gallery-data-info");
    // console.log(galleryData)
    galleryData.forEach((e) => {
        // console.log(e)
        if (e.type === "img") {
            imgVar++;
        } else if (e.type === "video"){
            videoVar++;
        } else {
            screenVar++;
        }
    })

    galleryDataInfo.innerText = `${imgVar} photos, ${videoVar} videos, ${screenVar} screen-recording`;
}

//Functionality of Search Bar in Gallery to search any item with its name
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

//Functionality to Filter the items with the particular type.
galleryFilter.addEventListener("change", (e) => {
    const mediaContainer = document.querySelectorAll(".media-container");
    const filterValue = e.target.id;
    if (mediaContainer) {
        if (filterValue === "all") {
            mediaContainer.forEach((e) => {
                e.style.display = "flex";
            })
        }
        else {
            mediaContainer.forEach((e) => {
                if (filterValue === e.classList[1]) {
                    e.style.display = "flex";
                } else {
                    e.style.display = "none";
                }
            })
        }
    }
});