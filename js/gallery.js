//Galéria lap

const galleryButtons = document.querySelectorAll(".gallery-button");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentIndex = 0;

function updateLightboxImage() {
    const image = galleryButtons[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}

// Lightbox megnyitása
function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.remove("hidden");
}

// Lightbox bezárása
function closeLightbox() {
    lightbox.classList.add("hidden");
}

// Képre kattintás
galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        openLightbox(index);
    });
});

// Bezárás az X gombbal
closeButton.addEventListener("click", () => {
    closeLightbox();
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

function nextImage() {
    currentIndex++;
    if (currentIndex >= galleryButtons.length) {
        currentIndex = 0;
    }
    updateLightboxImage();
}

nextButton.addEventListener("click", () => {
    nextImage();
});

function previousImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = galleryButtons.length - 1;
    }
    updateLightboxImage();
}

prevButton.addEventListener("click", () => {
    previousImage();
});

document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("hidden")) {
        return;
    }
    if (event.key === "Escape") {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("hidden")) {
        return;
    }
    if (event.key === "Escape") {
        closeLightbox();
    }
    if (event.key === "ArrowRight") {
        nextImage();
    }
    if (event.key === "ArrowLeft") {
        previousImage();
    }
});