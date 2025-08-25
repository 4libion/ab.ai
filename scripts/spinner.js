function t(key) {
  const lang = localStorage.getItem("lang") || "en";
  return translations[lang] && translations[lang][key] 
         ? translations[lang][key] 
         : key;
}

document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const btnText = document.getElementById("btnText");
    const spinner = document.getElementById("spinner");
    const successMsg = document.getElementById("successMsg");

    btnText.textContent = t("spinner_submitting");
    spinner.classList.remove("hidden");

    const formData = {
        name: this.name.value,
        email: this.email.value,
        place: this.place.value,
        language: this.language.value,
        role: this.role.value
    };

    const endpoint = "";


    fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData)
    }).then(() => {
        this.reset();
        spinner.classList.add("hidden");
        btnText.textContent = t("register");

        successMsg.classList.remove("hidden");
        setTimeout(() => successMsg.classList.add("hidden"), 5000);
    }).catch(err => {
        spinner.classList.add("hidden");
        btnText.textContent = t("register");
        console.error("Error:", err);
    });
});