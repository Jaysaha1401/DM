(() => {
    let cart = 0;
    let wishlist = 0;

    const cartCount = document.getElementById("cartCount");
    const wishCount = document.getElementById("wishCount");
    const toast = document.getElementById("toast");

    function notify(message) {
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(window.__omniToast);
        window.__omniToast = setTimeout(() => toast.classList.remove("show"), 1800);
    }

    document.querySelectorAll("[data-cart]").forEach(btn => {
        btn.addEventListener("click", () => {
            cart++;
            cartCount.textContent = cart;
            notify("Added to cart");
        });
    });

    document.querySelectorAll(".icon-action[aria-label='Wishlist']").forEach(btn => {
        btn.addEventListener("click", () => {
            wishlist++;
            wishCount.textContent = wishlist;
            notify("Added to wishlist");
        });
    });

    const search = document.getElementById("globalSearch");
    const searchBtn = document.getElementById("searchBtn");
    function doSearch() {
        const q = search.value.trim().toLowerCase();
        if (!q) {
            document.querySelector("#gift-cards").scrollIntoView({behavior:"smooth"});
            return;
        }
        const matches = [...document.querySelectorAll(".gift-product, .affiliate-products article, .promo")];
        const match = matches.find(el => el.textContent.toLowerCase().includes(q));
        if (match) {
            match.scrollIntoView({behavior:"smooth", block:"center"});
            match.animate([{transform:"scale(1)"},{transform:"scale(1.03)"},{transform:"scale(1)"}], {duration:500});
        } else {
            notify("No matching item found");
        }
    }
    searchBtn.addEventListener("click", doSearch);
    search.addEventListener("keydown", e => { if(e.key === "Enter") doSearch(); });

    // Hero dot/arrow demo interaction.
    const dots = [...document.querySelectorAll(".hero-dots i")];
    let heroIndex = 0;
    function setHero(i) {
        heroIndex = (i + dots.length) % dots.length;
        dots.forEach((d, n) => d.classList.toggle("active", n === heroIndex));
    }
    document.querySelector(".hero-arrow.left").addEventListener("click", () => setHero(heroIndex - 1));
    document.querySelector(".hero-arrow.right").addEventListener("click", () => setHero(heroIndex + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => setHero(i)));
    setInterval(() => setHero(heroIndex + 1), 5000);
})();
