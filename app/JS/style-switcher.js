
/*------toggle style switcher----------*/

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

//hide style-switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/*--------Theme Colors--------*/

const colorSelector = document.querySelector(".colors");

const root = document.querySelector(":root");

colorSelector.addEventListener("click", (event) => {
    if(event.target.classList.contains("color-1")) {
        root.style.setProperty("--skin-color", "#fb839e");
    }
    else if (event.target.classList.contains("color-2")) {
        root.style.setProperty("--skin-color", "#ec9412");
    }
    else if (event.target.classList.contains("color-3")) {
        root.style.setProperty("--skin-color", "#1fc586");
    }
    else if (event.target.classList.contains("color-4")) {
        root.style.setProperty("--skin-color", "#2eb1ed");
    }
    else if (event.target.classList.contains("color-5")) {
        root.style.setProperty("--skin-color", "#cc3a3b");
    }
})

