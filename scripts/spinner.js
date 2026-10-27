function t(key) {
  const lang = localStorage.getItem("lang") || "en";
  return translations[lang] && translations[lang][key]
         ? translations[lang][key]
         : key;
}

// Google Apps Script web app (Deploy → Manage deployments → URL ending in /exec)
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxzdaINC2yjp15hmfLVmknJtrKc7gUdd_DpW5JkYtQT03Lb6OAjgsZ_7AKqCG_zijLySA/exec";

document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const button = form.querySelector('button[type="submit"]');
    const btnText = document.getElementById("btnText");
    const spinner = document.getElementById("spinner");
    const successMsg = document.getElementById("successMsg");
    const errorMsg = document.getElementById("errorMsg");

    successMsg.classList.add("hidden");
    errorMsg.classList.add("hidden");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    button.disabled = true;
    btnText.textContent = t("spinner_submitting");
    spinner.classList.remove("hidden");

    // Form-encoded body: a "simple" request, so the browser posts straight to
    // Apps Script without a CORS preflight, and we can read the JSON reply.
    const body = new URLSearchParams();
    ["name", "email", "place", "language", "role"].forEach(k => body.append(k, form[k].value.trim()));
    body.append("page", location.href);

    function done() {
        button.disabled = false;
        spinner.classList.add("hidden");
        btnText.textContent = t("register");
    }

    fetch(FORM_ENDPOINT, { method: "POST", body: body })
        .then(res => res.json())
        .then(json => {
            if (!json || json.result !== "success") throw new Error(json && json.error);
            form.reset();
            done();
            successMsg.classList.remove("hidden");
            setTimeout(() => successMsg.classList.add("hidden"), 8000);
        })
        .catch(err => {
            console.error("Form error:", err);
            done();
            errorMsg.classList.remove("hidden");
        });
});
