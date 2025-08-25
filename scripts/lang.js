function updateLangSelected(lang) {
    const langSelected = document.querySelectorAll("#langSelected");
    let html = "";

    if (lang === "kz") html = `<span class="fi fi-kz mr-1"></span>Қаз`;
    if (lang === "ru") html = `<span class="fi fi-ru mr-1"></span>Рус`;
    if (lang === "en") html = `<span class="fi fi-gb mr-1"></span>Eng`;

    langSelected.forEach(el => el.innerHTML = html);
}

function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        } else {
            console.log("Translation not found for key:", key);
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute("placeholder", translations[lang][key]);
        }
    });

    localStorage.setItem("lang", lang);
    updateLangSelected(lang)
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLanguage(savedLang);

    document.querySelectorAll("#langMenu button, #langMenuMobile button").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.innerText.includes("Қаз")) setLanguage("kz");
            if (btn.innerText.includes("Рус")) setLanguage("ru");
            if (btn.innerText.includes("Eng")) setLanguage("en");
        });
    });
});