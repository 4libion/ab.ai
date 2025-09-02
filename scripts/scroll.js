document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
        const yOffset = -80; // adjust if navbar overlaps content
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
        }
    });
});