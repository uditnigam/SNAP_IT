const opacityRange = document.querySelector(".opacity-range");
const brightnessRange = document.querySelector(".brightness-range");
const contrastRange = document.querySelector(".contrast-range");
const saturationRange = document.querySelector(".saturation-range");
const grayscaleRange = document.querySelector(".grayscale-range");
const invertRange = document.querySelector(".invert-range");
const sepiaRange = document.querySelector(".sepia-range");
const hueRange = document.querySelector(".hue-range");
const brightnessValue = document.querySelector(".brightness-value");
const contrastValue = document.querySelector(".contrast-value");
const grayscaleValue = document.querySelector(".grayscale-value");
const opacityValue = document.querySelector(".opacity-value");
const saturateValue = document.querySelector(".saturate-value");
const invertValue = document.querySelector(".invert-value");
const sepiaValue = document.querySelector(".sepia-value");
const hueValue = document.querySelector(".hue-value");

const filterReset = document.querySelector(".filter-reset");
const zoomReset = document.querySelector(".zoom-reset");
const timerReset = document.querySelector(".timer-reset");

const zoomIn = document.querySelector(".zoom-in");
const zoomOut = document.querySelector(".zoom-out");

const filters = {
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    opacity: 100,
    saturate: 100,
    invert: 0,
    sepia: 0,
    hueRotate: 0,
};

let zoomLevel = 1;
let newFilter;
let resetFilter;
let resetZoom;
let resetTimer;

// Reset Function Calling on click of Reset Button
filterReset.addEventListener("click", () => {
    resetFilters();
})
// Function to Update the value of the Filters Options
function updateFilters() {
    newFilter = " brightness(" + filters.brightness + "%) "
        + " opacity(" + filters.opacity + "%) "
        + " contrast(" + filters.contrast + "%) "
        + " saturate(" + filters.saturate + "%) "
        + " grayscale(" + filters.grayscale + "%) "
        + " invert(" + filters.invert + "%) "
        + " sepia(" + filters.sepia + "%) "
        + " hue-rotate(" + filters.hueRotate + "deg) ";
    console.log(newFilter)
    video.style.filter = newFilter;
}
// Function to reset the Filters Settings to the default state
function resetFilters() {
    resetFilter = " brightness(" + 100 + "%) "
        + " opacity(" + 100 + "%) "
        + " contrast(" + 100 + "%) "
        + " saturate(" + 100 + "%) "
        + " grayscale(" + 0 + "%) "
        + " invert(" + 0 + "%) "
        + " sepia(" + 0 + "%) "
        + " hue-rotate(" + 0 + "deg) ";
    video.style.filter = resetFilter;

    brightnessRange.value = 100;
    brightnessValue.textContent = 100 + "%";

    contrastRange.value = 100;
    contrastValue.textContent = 100 + "%";

    opacityRange.value = 100;
    opacityValue.textContent = 100 + "%";

    saturationRange.value = 100;
    saturateValue.textContent = 100 + "%";

    grayscaleRange.value = 0;
    grayscaleValue.textContent = 0 + "%";

    invertRange.value = 0;
    invertValue.textContent = 0 + "%";

    sepiaRange.value = 0;
    sepiaValue.textContent = 0 + "%";

    hueRange.value = 0;
    hueValue.textContent = 0 + "%";
}

// Filters Value Updation
brightnessRange.addEventListener("input", function () {
    brightnessValue.textContent = this.value + "%";
    filters.brightness = brightnessRange.value;
    // console.log(filters.brightness)
    updateFilters();
});
grayscaleRange.addEventListener("input", function () {
    grayscaleValue.textContent = this.value + "%";
    filters.grayscale = grayscaleRange.value;
    updateFilters();
});
opacityRange.addEventListener("input", function () {
    opacityValue.textContent = this.value + "%";
    filters.opacity = opacityRange.value;
    updateFilters();
});
contrastRange.addEventListener("input", function () {
    contrastValue.textContent = this.value + "%";
    filters.contrast = contrastRange.value;
    updateFilters();
});
saturationRange.addEventListener("input", function () {
    saturateValue.textContent = this.value + "%";
    filters.grayscale = saturationRange.value;
    updateFilters();
});
invertRange.addEventListener("input", function () {
    invertValue.textContent = this.value + "%";
    filters.invert = invertRange.value;
    updateFilters();
});
sepiaRange.addEventListener("input", function () {
    sepiaValue.textContent = this.value + "%";
    filters.sepia = sepiaRange.value;
    updateFilters();
});
hueRange.addEventListener("input", function () {
    hueValue.textContent = this.value + "%";
    filters.hueRotate = hueRange.value;
    updateFilters();
});

//Function to open and close the Settings Toolbar Panel
settingOpenBtn.addEventListener("click", (e) => {
    openNav();
});
function openNav() {
    document.getElementById("mySidenav").style.width = "450px";
};
settingCloseIcon.addEventListener("click", (e) => {
    closeNav();
});
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        document.getElementById("mySidenav").style.width = "0";
    }
});

//Adding Funcionality to Set Arrow Up and Down on Open and Close the Settings modal.
const filterCollapseBtn = document.querySelector(".filter-collapse-btn");
filterCollapseBtn.addEventListener("click", (e) => {
    const arrowDown = document.querySelector(".filter-arrow-down");
    const arrowUp = document.querySelector(".filter-arrow-up");
    const activeArrow = filterCollapseBtn.children[0].children[0].classList.contains("active-arrow");
    if (activeArrow) {
        filterCollapseBtn.children[0].children[0].classList.remove("active-arrow");
        arrowDown.style.display = "none";
        arrowUp.style.display = "flex";
    } else {
        filterCollapseBtn.children[0].children[0].classList.add("active-arrow");
        arrowDown.style.display = "flex";
        arrowUp.style.display = "none";
    }
});
const zoomCollapseBtn = document.querySelector(".zoom-collapse-btn");
zoomCollapseBtn.addEventListener("click", (e) => {
    const arrowDown = document.querySelector(".zoom-arrow-down");
    const arrowUp = document.querySelector(".zoom-arrow-up");
    const activeArrow = zoomCollapseBtn.children[0].children[0].classList.contains("active-arrow");
    if (activeArrow) {
        zoomCollapseBtn.children[0].children[0].classList.remove("active-arrow");
        arrowDown.style.display = "none";
        arrowUp.style.display = "flex";
    } else {
        zoomCollapseBtn.children[0].children[0].classList.add("active-arrow");
        arrowDown.style.display = "flex";
        arrowUp.style.display = "none";
    }
});
const timerCollapseBtn = document.querySelector(".timer-collapse-btn");
timerCollapseBtn.addEventListener("click", (e) => {
    const arrowDown = document.querySelector(".timer-arrow-down");
    const arrowUp = document.querySelector(".timer-arrow-up");
    const activeArrow = timerCollapseBtn.children[0].children[0].classList.contains("active-arrow");
    // console.log(timerCollapseBtn.children[1])
    if (activeArrow) {
        timerCollapseBtn.children[0].children[0].classList.remove("active-arrow");
        arrowDown.style.display = "none";
        arrowUp.style.display = "flex";
    } else {
        timerCollapseBtn.children[0].children[0].classList.add("active-arrow");
        arrowDown.style.display = "flex";
        arrowUp.style.display = "none";
    }
});

// Zoom-IN and Zoom-OUT Functionality

zoomIn.addEventListener("click", (e) =>{
    if (zoomLevel < 3){
        zoomLevel += 0.2;
        video.style.transform = `scale(${zoomLevel})`
    }
});

zoomOut.addEventListener("click", (e) =>{
    if (zoomLevel > 1){
        zoomLevel -= 0.2;
        video.style.transform = `scale(${zoomLevel})`
    }
});
