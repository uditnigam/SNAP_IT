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
function addData(uid, link, type, name, date) {
    const transaction = db.transaction(["gallery"], "readwrite");
    const gallery = transaction.objectStore("gallery");
    const data = {
        uid: uid,
        link: link,
        type,
        name: name,
        date: date
    }
    gallery.add(data);
};

function displayData() {
    const mainContainer = document.querySelector(".gallery-container");
    const transaction = db.transaction(["gallery"], "readwrite");
    const gallery = transaction.objectStore("gallery");
    const request = gallery.openCursor();
    request.onsuccess = function () {
        const output = request.result;
        if (output) {
            console.log(output.value.uid)
            const imageContainer = document.createElement("div");
            imageContainer.setAttribute("class", "image-container");
            imageContainer.setAttribute("uid", output.value.uid);
            if (output.value.type === "img") {
                imageContainer.classList.add("image");
                imageContainer.innerHTML = `
                <div class="image"><img src="${output.value.link}"></div>
                `
            }
            mainContainer.appendChild(imageContainer);
            output.continue();
        }

    }
};
