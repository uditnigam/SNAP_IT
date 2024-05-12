let db;

let request = indexedDB.open("media", 1);

request.onsuccess = function (e) {
    db = request.result;
}

request.onerror = function (e) {
    console.log(e);
}

request.onupgradeneeded = function (e) {
    db = request.result;
    db.createObjectStore("gallery", { keyPath: "uid" });
}

//Add data to the database
function addData(data, type, name, date) {
    const transaction = db.transaction("gallery", "readwrite");
    const gallery = transaction.objectStore("gallery");
    const infoData = {
        uid: Date.now(),
        link: data,
        type,
        name: name,
        date: date
    }
    gallery.add(infoData);
};

function displayData() {
    const galleryContainer = document.querySelector(".gallery-container");
    const transaction = db.transaction("gallery", "readwrite");
    const gallery = transaction.objectStore("gallery");
    const request = gallery.openCursor();
    request.onsuccess = function () {
        const output = request.result;
        if (output) {
            mediaContainerOfGallery(output, galleryContainer);
        }
    }
};

function mediaContainerOfGallery(output, galleryContainer) {
    const mediaContainer = document.createElement("div");
    mediaContainer.setAttribute("class", "media-container");
    mediaContainer.setAttribute("uid", output.value.uid);
    if (output.value.type === "img") {
        mediaContainer.classList.add("image");
        mediaContainer.innerHTML = `
            <div class="top-buttons">
                <i class="bi bi-x-circle-fill cross"></i>
                <i class="bi bi-file-arrow-down-fill download-button"></i>
            </div>
            <img class="image" src="${output.value.link}" name="${output.value.name}"></img>
            <div class="card-button">
                <div class="media-name">${output.value.name}</div>
                <i class="bi bi-pencil-fill edit-button"></i>
            </div>`
    } else {
        mediaContainer.classList.add("video");
        mediaContainer.innerHTML = `
            <div class="top-buttons">
                <i class="bi bi-x-circle-fill cross"></i>
                <i class="bi bi-file-arrow-down-fill download-button"></i>
            </div>
            <video class="video"></video>
            <div class="card-button">
                <div class="media-name">${output.value.name}</div>
                <i class="bi bi-pencil-fill edit-button"></i>
            </div>`;
        const videoDisplayCont = mediaContainer.querySelector(".video");
        videoDisplayCont.src = window.URL.createObjectURL(output.value.link);
        videoDisplayCont.autoplay = true;
        videoDisplayCont.controls = true;
        videoDisplayCont.loop = true;
    }
    galleryContainer.appendChild(mediaContainer);
    mediaContainer.addEventListener("click", (e) => {
        cardButton(e, mediaContainer);
    })
    output.continue();
    return mediaContainer;
};

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
    }
};

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

function deleteMedia(event) {
    const dataTask = Number(event.target.parentNode.parentNode.getAttribute("uid"));
    const transaction = db.transaction("gallery", "readwrite");
    const request = transaction.objectStore("gallery").delete(dataTask);
};