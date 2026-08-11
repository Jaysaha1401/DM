const sliders = document.querySelectorAll(".product-slider");

sliders.forEach((slider) => {
    const images = slider.querySelectorAll("img");
    const previousButton = slider.querySelector(".slider-prev");
    const nextButton = slider.querySelector(".slider-next");
    const dots = slider.querySelectorAll(".slider-dots .dot");

    if (!images.length) return;

    let currentImage = 0;

    function showImage(index) {
        currentImage = (index + images.length) % images.length;

        images.forEach((image, i) => {
            image.classList.toggle("is-active", i === currentImage);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentImage);
        });
    }

    function nextImage() {
        showImage(currentImage + 1);
    }

    function previousImage() {
        showImage(currentImage - 1);
    }

    nextButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        nextImage();
    });

    previousButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        previousImage();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            showImage(index);
        });
    });

    showImage(0);

    setInterval(nextImage, 3000);
});
