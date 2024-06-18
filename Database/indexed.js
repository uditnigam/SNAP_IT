let db;
let galleryData;

let request = indexedDB.open("media", 1);

request.onsuccess = function (e) {
    db = request.result;
    getAllDataFromIndexDb();
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
//Delete the cards from the gallery
function deleteMedia(uid) {
    const transaction = db.transaction("gallery", "readwrite");
    const request = transaction.objectStore("gallery").delete(uid);
};

//Update the data in the database after edit the name
function updateData(updatedName, key) {
    const objectStore = db.transaction("gallery", "readwrite").objectStore("gallery");
    const request = objectStore.get(key);
    request.onsuccess = () => {
        const cards = request.result;
        // console.log(cards)
        cards.name = updatedName;
        objectStore.put(cards).then;
    }
};
function getAllDataFromIndexDb() {
    const transaction = db.transaction("gallery", "readonly");
    const allMedia = transaction.objectStore("gallery").getAll();
    allMedia.onsuccess = () => {
        const mediaCards = allMedia.result;
        galleryData = mediaCards;
        // console.log(mediaCards)
        return mediaCards;
    }
    allMedia.onerror = () => {
        console.log("error")
    }
};

