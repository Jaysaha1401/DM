const sliderImages = document.querySelectorAll(".product-slider img");

const previousButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

let currentImage = 0;

// Show only the current image
function showImage(index) {
    sliderImages.forEach((image, i) => {
        image.style.display = i === index ? "block" : "none";
    });
}

// Next image
nextButton.addEventListener("click", () => {
    currentImage++;

    if (currentImage >= sliderImages.length) {
        currentImage = 0;
    }

    showImage(currentImage);
});

// Previous image
previousButton.addEventListener("click", () => {
    currentImage--;

    if (currentImage < 0) {
        currentImage = sliderImages.length - 1;
    }

    showImage(currentImage);
});

// Start with first image
showImage(currentImage);

// Automatic change every 3 seconds
setInterval(() => {
    currentImage++;

    if (currentImage >= sliderImages.length) {
        currentImage = 0;
    }

    showImage(currentImage);
}, 3000);