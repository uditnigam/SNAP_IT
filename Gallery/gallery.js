const galleryPageBackBtn = document.querySelector(".gallery-container-back-btn");
const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const galleryFilter = document.querySelectorAll(".filter-dropdown-item");
const mediaContainer = document.querySelectorAll(".media-container");
const sortingValueByMethod = document.querySelectorAll(".sorting-by-method");
const sortingValueByOrder = document.querySelectorAll(".sorting-by-order");
const loader = document.querySelector(".page-loader");
const galleryContainer = document.querySelector(".gallery-container");
const deleteAllData = document.querySelector(".delete-all-data");
const galleryDataInfo = document.querySelector(".gallery-data-info");

let currentSortingMethod = "date";
let currentSortingOrder = "ascending";
let imgVar = 0;
let videoVar = 0;
let screenVar = 0;
let input = false;

// To show the dropdown
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

galleryPageBackBtn.addEventListener("click", (e) => {
    window.location.href = "/SNAP_IT/index.html";
});

setTimeout(function () {
    loader.style.display = "none";
    getMediaCardsFromDatabase();
    galleryDataInformation();
}, 1200);

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
        mediaContainer.classList.add("images");
        mediaContainer.innerHTML = `
            <div class="top-buttons">
                <div class="top-left-buttons">
                    <img src="/SNAP_IT/Assests/Icons/Download.svg" class="download-button">
                    <img src="/SNAP_IT/Assests/Icons/Cross.svg" class="cross">
                </div>
                <img class="image" src="${link}" name="${name}"></img>
            </div>
            <div class="card-button">
                <div class="media-name">${name}</div>
                <img src="/SNAP_IT/Assests/Icons/Edit.svg" class=" edit-button">
            </div>`
    } else {
        type == "screen" ?
            mediaContainer.classList.add("screen") :
            mediaContainer.classList.add("videos");
        mediaContainer.innerHTML = `
        <div class="top-buttons">
            <div class="top-left-buttons">
                <img src="/SNAP_IT/Assests/Icons/Download.svg" class="download-button">
            <img src="/SNAP_IT/Assests/Icons/Cross.svg" class="cross">
            </div>
            <video class="video" name="${name}"></video>
        </div>
        <div class="card-button">
            <div class="media-name">${name}</div>
            <img src="/SNAP_IT/Assests/Icons/Edit.svg" class=" edit-button">
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
        const uid = Number(e.target.parentElement.parentElement.parentElement.getAttribute("uid"));
        deleteMedia(uid);
        // galleryDataInformation()
    }
    if (e.target.classList.contains("download-button")) {
        const name = e.target.parentNode.parentNode.parentElement.children[1].children[0].innerText;
        const target = e.currentTarget.children[0].children[1];
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
    // mediaName.addEventListener("blur", (e) => {
    //     const name = e.target.innerText;
    //     mediaName.innerText = name;
    //     updateData(mediaName.innerText, uid);
    //     mediaName.contentEditable = "false";
    // })
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
    mediaLink.href = event.src;
    if (event.nodeName == "IMG") {
        mediaLink.download = mediaName + ".png"
    } else {
        mediaLink.download = mediaName + ".mp4"
    }
    mediaLink.click();
    mediaLink.remove();
};

searchInput.addEventListener("keyup", (e) => {
    const mediaContainer = document.querySelectorAll(".media-container");
    let query = e.target.value.toLowerCase();
    // console.log(query)
    if (mediaContainer) {
        if (query.trim() === "") {
            mediaContainer.forEach((elem) => {
                elem.style.display = "flex";
            })
        }
        else {
            mediaContainer.forEach((elem) => {
                // console.log(elem.children[1])
                if (query.trim() && elem.children[1].getAttribute("name").toLowerCase().includes(query)) {
                    elem.style.display = "flex";
                } else {
                    elem.style.display = "none";
                }
            })
        }
    }
})

window.addEventListener("keydown", function (event) {
    const mediaContainer = document.querySelectorAll(".media-container");
    if (event.key === "Escape") {
        mediaContainer.forEach((e) => {
            e.style.display = "flex"
            searchInput.value = "";
            input = false;
        })
    }
})

//Functionality to Filter the items with the particular type.
galleryFilter.forEach((e) => {
    e.addEventListener("click", (ele) => {
        const mediaContainer = document.querySelectorAll(".media-container");
        const filterNameValue = (ele.currentTarget.children[1].innerText).toLowerCase();
        const filterValueSplit = filterNameValue.split(" ");
        const filterValue = filterValueSplit[0];
        if (mediaContainer) {
            if (filterValue === "all") {
                mediaContainer.forEach((e) => {
                    e.style.display = "flex";
                    galleryDataInformation();
                })
            }
            else {
                mediaContainer.forEach((element) => {
                    if (filterValue === element.classList[1]) {
                        if (element.classList[1].includes("images")) {
                            galleryDataInfo.innerHTML = `
                            <div class="data-info-header"><i class="bi bi-images camera-icon"></i>Images</div>
                            <div class="data-info-main">${imgVar} photos</div>
                            `;
                        } else if (element.classList[1].includes("videos")) {
                            galleryDataInfo.innerHTML = `
                            <div class="data-info-header"><i class="bi bi-images camera-icon"></i>Videos</div>
                            <div class="data-info-main">${videoVar} videos</div>
                            `;
                        } else if (element.classList[1].includes("screen")) {
                            galleryDataInfo.innerHTML = `
                            <div class="data-info-header"><i class="bi bi-images camera-icon"></i>Screen Recording</div>
                            <div class="data-info-main">${screenVar} screen recording</div>
                            `;
                        }
                        element.style.display = "flex";
                    } else {
                        element.style.display = "none";
                    }
                })
            }
            galleryFilter.forEach((ele) => {
                ele.classList.remove("active");
            })
            e.classList.add("active");
        }
    })
});

// Functionality to Filter the items with Name and Date Created in "ascending" or "descending" order.
sortingValueByMethod.forEach((e) => {
    e.addEventListener("click", (ele) => {
        currentSortingMethod = (e.getAttribute("value")).toLowerCase();
        sortingValueByMethod.forEach((e) => {
            e.classList.remove("active");
        })
        e.classList.add("active");
        if (mediaContainer) {
            if (currentSortingMethod === "date") {
                selectionSort(galleryData, "date", currentSortingOrder)
            } else {
                selectionSort(galleryData, "name", currentSortingOrder)
            }
            galleryContainer.innerHTML = "";
        }
        getMediaCardsFromDatabase();
    })
});
sortingValueByOrder.forEach((e) => {
    e.addEventListener("click", (ele) => {
        currentSortingOrder = (e.getAttribute("value")).toLowerCase();
        sortingValueByOrder.forEach((e) => {
            e.classList.remove("active");
        })
        e.classList.add("active");
        if (mediaContainer) {
            if (currentSortingOrder === "ascending") {
                selectionSort(galleryData, currentSortingMethod, "ascending")
            } else {
                selectionSort(galleryData, currentSortingMethod, "descending")
            }
            galleryContainer.innerHTML = "";
        }
        getMediaCardsFromDatabase();
    })
});
function selectionSort(arr, method, order) {
    let n = arr.length;
    for (let i = 0; i < (n - 1); i++) {
        let min_max = i;
        if (order == "ascending")
            for (let j = i + 1; j < n; j++) {
                if (arr[j][method] < arr[min_max][method]) {
                    min_max = j;
                }
            }
        else
            for (let j = i + 1; j < n; j++) {
                console.log("hy")
                if (arr[j][method] > arr[min_max][method]) {
                    min_max = j;
                }
            }
        if (min_max !== i) {
            let temp = arr[i];
            arr[i] = arr[min_max];
            arr[min_max] = temp;
        }
    }
}


function galleryDataInformation() {
    galleryData.forEach((e) => {
        if (e.type === "img") {
            imgVar++;
        } else if (e.type === "video") {
            videoVar++;
        } else {
            screenVar++;
        }
    })
    galleryDataInfo.innerHTML = `
                                <div class="data-info-header"><i class="bi bi-images camera-icon"></i>All Media</div>
                                <div class="data-info-main">${imgVar} photos, ${videoVar} videos, ${screenVar} screen-recording</div>
                        `;
};

deleteAllData.addEventListener("click", (e) => {
    galleryData.forEach((ele) => {
        const uid = ele.uid;
        deleteMedia(uid);
        galleryContainer.innerHTML = "";
        console.log(galleryData)
    })
    console.log(galleryData)
    // galleryDataInformation();
});
