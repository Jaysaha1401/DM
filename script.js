const sliderImages = document.querySelectorAll(".product-slider img");

let currentImage = 0;

setInterval(() => {
    sliderImages[currentImage].style.display = "none";

    currentImage++;

    if (currentImage >= sliderImages.length) {
        currentImage = 0;
    }

    sliderImages[currentImage].style.display = "block";
}, 3000);