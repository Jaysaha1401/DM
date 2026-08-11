document.querySelectorAll(".product-slider").forEach((slider) => {
    const images = [...slider.querySelectorAll(":scope > img")];
    const previousButton = slider.querySelector(".slider-prev");
    const nextButton = slider.querySelector(".slider-next");
    const dots = [...slider.querySelectorAll(".slider-dots .dot")];

    if (!images.length) return;

    let currentImage = 0;
    let timer;

    function showImage(index) {
        currentImage = (index + images.length) % images.length;

        images.forEach((image, i) => {
            image.classList.toggle("is-active", i === currentImage);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentImage);
            dot.setAttribute("aria-current", i === currentImage ? "true" : "false");
        });
    }

    function nextImage() {
        showImage(currentImage + 1);
    }

    function previousImage() {
        showImage(currentImage - 1);
    }

    // A single-image product does not need arrows or dots.
    if (images.length <= 1) {
        previousButton?.remove();
        nextButton?.remove();
        slider.querySelector(".slider-dots")?.remove();
        showImage(0);
        return;
    }

    previousButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        previousImage();
        restartTimer();
    });

    nextButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        nextImage();
        restartTimer();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            showImage(index);
            restartTimer();
        });
    });

    function restartTimer() {
        clearInterval(timer);
        timer = setInterval(nextImage, 3000);
    }

    showImage(0);
    restartTimer();
});
