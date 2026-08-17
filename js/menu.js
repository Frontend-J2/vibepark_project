const navList = document.querySelector('.nav-list');
const navItem = document.querySelectorAll('.nav-item');
const hamblines = document.querySelectorAll('.hambicon-line');

function hambOn(){
    navList.classList.toggle("hidden-nav-list");
    hamblines.forEach((line) => {
        line.classList.toggle("kapcsolt");
    });
    navItem.forEach((element, index) => {
        setTimeout(() => {
            element.classList.toggle("hidden-nav-item");
        }, 100 + index * 50);
    })
}
const nav = document.querySelector(".nav");

let lastScrollY = window.scrollY;
const scrollThreshold = 10;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    // A lap tetején mindig látszik a menü
    if (currentScrollY <= 0) {
        nav.classList.remove("hide");
        lastScrollY = currentScrollY;
        return;
    }

    // Csak akkor reagáljon, ha eleget görgettünk
    if (Math.abs(scrollDifference) < scrollThreshold) {
        return;
    }

    if (scrollDifference > 0) {
        console.log("hide");
        nav.classList.add("hide");
    } else {
        console.log("show");
        nav.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
});