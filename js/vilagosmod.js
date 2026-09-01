const light = localStorage.getItem("lightMode");
const lightBtn = document.querySelector(".theme-in");
lightModeInner();

if (light === "true"){
    document.body.classList.add("light-mode");
    lightBtn.classList.add("on");
    lightModeInner();
}

const themeBtn = document.querySelector("#themeBtn")

themeBtn.addEventListener("click", function(){
    document.body.classList.toggle("light-mode");
    lightBtn.classList.toggle("on");

    const light = document.body.classList.contains("light-mode");
    localStorage.setItem("lightMode", light);
    lightModeInner();
});

function lightModeInner(){
    const light = localStorage.getItem("lightMode");
    if (light === "true"){
        lightBtn.innerText = "☀️"
    } else {
        lightBtn.innerText = "🌙"
    }
}