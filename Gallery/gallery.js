const galleryPageBackBtn = document.querySelector(".gallery-container-back-btn");
const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const galleryFilter = document.querySelector(".filter-btn-group");
const gallerySorting = document.querySelector(".sort-btn-group");
const loader = document.querySelector(".page-loader");
const galleryContainer = document.querySelector(".gallery-container");
const deleteAllData = document.querySelector(".delete-all-data");

let imgVar = 0;
let videoVar = 0;
let screenVar = 0;
let input = false;

// To show the dropdown
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

galleryPageBackBtn.addEventListener("click", (e) => {
    window.location.href = "/homepage.html";
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
        mediaContainer.classList.add("image");
        mediaContainer.innerHTML = `
            <div class="top-buttons">
                <div class="top-left-buttons">
                    <i class="bi bi-x-circle-fill cross"></i>
                    <i class="bi bi-file-arrow-down-fill download-button"></i>
                </div>
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
            <div class="top-left-buttons">
                <i class="bi bi-x-circle-fill cross"></i>
                <i class="bi bi-file-arrow-down-fill download-button"></i>
            </div>
        </div>
            <video class="video" name="${name}"></video>
            <div class="card-button">
                <div class="media-name">${name}</div>
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
        const uid = Number(e.target.parentElement.parentElement.parentElement.getAttribute("uid"));
        deleteMedia(uid);
        // galleryDataInformation()
    }
    if (e.target.classList.contains("download-button")) {
        const name = e.target.parentNode.parentNode.parentNode.children[2].children[0].innerText;
        const target = e.currentTarget.children[1];
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


//Functionality of Search Bar in Gallery to search any item with its name
searchIcon.addEventListener("click", (e) => {
    const mediaContainer = document.querySelectorAll(".media-container");
    if (input) {
        mediaContainer.forEach((e) => {
            e.style.display = "flex"
            searchInput.style.display = "none";
            searchInput.value = "";
        })
        input = !input;
    }
    else {
        searchInput.style.display = "flex";
        input = !input;
        searchInput.focus();
    }
});

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
                console.log(elem.children[1])
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
            searchInput.style.display = "none";
            searchInput.value = "";
            input = false;
        })
    }
})

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

gallerySorting.addEventListener("change", (e) => {
    const mediaContainer = document.querySelectorAll(".media-container");

    const sortingValueByMethod = document.querySelectorAll(".sorting-by-method");
    sortingValueByMethod.forEach((e) => {
        if (e.checked) {
            currentSortingMethod = e.id;
        }
    })
    const sortingValueByOrder = document.querySelectorAll(".sorting-by-order");
    sortingValueByOrder.forEach((e) => {
        if (e.checked) {
            currentSortingOrder = e.id;
        }
    })
    if (mediaContainer) {
        if (currentSortingMethod === "Date Created") {
            selectionSort(galleryData, "date", currentSortingOrder)
        } else {
            selectionSort(galleryData, "name", currentSortingOrder)
        }
        galleryContainer.innerHTML = "";
    }
    getMediaCardsFromDatabase();
})

function selectionSort(arr, method, order) {
    let n = arr.length;
    for (let i = 0; i < (n - 1); i++) {
        let min_max = i;
        if (order == "Ascending")
            for (let j = i + 1; j < n; j++) {
                if (arr[j][method] < arr[min_max][method]) {
                    min_max = j;
                }
            }
        else
            for (let j = i + 1; j < n; j++) {
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
    // arr.slice(0,5)
    // console.log(arr);
}
// setInterval(galleryDataInformation, 1000);

function galleryDataInformation() {
    const galleryDataInfo = document.querySelector(".gallery-data-info");
    galleryData.forEach((e) => {
        // console.log(e)
        if (e.type === "img") {
            imgVar++;
        } else if (e.type === "video") {
            videoVar++;
        } else {
            screenVar++;
        }
    })
    galleryDataInfo.innerText = `${imgVar} photos, ${videoVar} videos, ${screenVar} screen-recording`;
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
