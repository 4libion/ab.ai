document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");
    const langSelected = document.getElementById("langSelected");
    
    const langBtnMobile = document.getElementById("langBtnMobile");
    const langMenuMobile = document.getElementById("langMenuMobile");
    const langSelectedMobile = document.getElementById("langSelectedMobile");

    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("hidden");
    });

    langBtnMobile.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenuMobile.classList.toggle("hidden");
    });

    langMenu.querySelectorAll("button").forEach(option => {
        option.addEventListener("click", () => {
            langSelected.innerHTML = option.innerHTML;
            langMenu.classList.add("hidden");
        });
    });

    langMenuMobile.querySelectorAll("button").forEach(option => {
        option.addEventListener("click", () => {
            langSelectedMobile.innerHTML = option.innerHTML;
            langMenuMobile.classList.add("hidden");
        });
    });

    document.addEventListener("click", (e) => {
        if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.add("hidden");
        }
    });

    document.addEventListener("click", (e) => {
        if (!langBtnMobile.contains(e.target) && !langMenuMobile.contains(e.target)) {
            langMenuMobile.classList.add("hidden");
        }
    });

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
});