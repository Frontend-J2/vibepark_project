const herokepek = [...document.querySelectorAll(".hero-kep")];
const heroSection = document.querySelector(".hero-section");

let active_index = 0;
let slideInterval;

heroSection.style.backgroundImage =
    `url("${herokepek[0].querySelector("img").src}")`;
    
function updateherokep() {

    let elsoheroindex = (active_index + 1) % herokepek.length;
    let masodikheroindex = (active_index + 2) % herokepek.length;
    let harmadikheroindex = (active_index + 3) % herokepek.length;

    herokepek.forEach((elem, i) => {

        if (elem.classList.contains("activehero")) {
            const img = elem.querySelector("img");
            heroSection.style.backgroundImage = `url("${img.src}")`;
            elem.classList.remove("activehero");
        }

        elem.classList.remove(
            "elsohero",
            "masodikhero",
            "harmadikhero",
            "hiddenhero"
        );

        if (i === active_index) {
            elem.classList.add("activehero");
        } else if (i === elsoheroindex) {
            elem.classList.add("elsohero");
        } else if (i === masodikheroindex) {
            elem.classList.add("masodikhero");
        } else if (i === harmadikheroindex) {
            elem.classList.add("harmadikhero");
        } else {
            elem.classList.add("hiddenhero");
        }
    });
}

function startSlider() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        active_index = (active_index + 1) % herokepek.length;
        updateherokep();
    }, 9000);
}

heroSection.addEventListener("click", (e) => {
    const makeActive = e.target.closest(".hero-kep");
    if (!makeActive) return;

    const ujIndex = herokepek.indexOf(makeActive);

    if (ujIndex === active_index) return;

    active_index = ujIndex;
    updateherokep();

    startSlider();
});

updateherokep();
startSlider();