const herokepek = [...document.querySelectorAll(".hero-kep")];
const heroSection = document.querySelector(".hero-section");
const mainHero = document.getElementById('main-hero');
const heroData = [{  title: "Kép 1",
                    text: "Ez az első kép leírása.",
                    image: "img/hero/hero1.png"
                },
                {   title: "Kép 2",
                    text: "Ez a második kép leírása.",
                    image: "img/hero/hero2.png"
                },
                {   title: "Kép 3",
                    text: "Ez a harmadik kép leírása.",
                    image: "img/hero/hero3.png"
                },
                {   title: "Kép 4",
                    text: "Ez a negyedik kép leírása.",
                    image: "img/hero/hero4.png"
                },
                {   title: "Kép 5",
                    text: "Ez az ötödik kép leírása.",
                    image: "img/hero/hero5.png"
                }];

let active_index = 0;
let slideInterval;
mainHero.addEventListener("animationend", () => {
        heroSection.style.backgroundImage = `url("${mainHero.src}")`;
    });
  
function updateherokep() {
    let elsoheroindex = (active_index + 1) % herokepek.length;
    let masodikheroindex = (active_index + 2) % herokepek.length;
    let harmadikheroindex = (active_index + 3) % herokepek.length;

    mainHero.classList.remove("grow");
    // Kényszeríti a böngészőt újrarajzolásra
    void mainHero.offsetWidth;
    mainHero.src = heroData[active_index].image;
    mainHero.classList.add("grow");


    herokepek.forEach((elem, i) => {
        elem.classList.remove(
            "elsohero",
            "masodikhero",
            "harmadikhero",
            "hiddenhero"
        );

        if (i === elsoheroindex) {
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