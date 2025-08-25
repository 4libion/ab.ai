document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");
    const langSelected = document.getElementById("langSelected");

    langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("hidden");
    });

    langMenu.querySelectorAll("button").forEach(option => {
        option.addEventListener("click", () => {
            langSelected.innerHTML = option.innerHTML;
            langMenu.classList.add("hidden");
        });
    });

    document.addEventListener("click", (e) => {
        if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.add("hidden");
        }
    });

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
});