const festekfent = document.querySelector(".logosavfelso");
const festeklent = document.querySelector(".logosavalso");
const felirat = document.querySelector(".logoszoveg");
const tolto = document.querySelector(".tolto");
const toltosav = document.querySelector(".toltosav");
const toltofelirat = document.getElementById("szazalek");
const loaderContent = document.querySelector(".loader-animation");
let toltesertek = 0;
let szazalek = 0;

felirat.classList.add("feliratjon");
festekfent.classList.add("festekjon");
festeklent.classList.add("festekjon");

setTimeout(() => {
    felirat.classList.remove("feliratjon");
    festekfent.classList.remove("festekjon");
    festeklent.classList.remove("festekjon");

    tolto.style.opacity = "1";

    felirat.classList.add("beat");
    festekfent.classList.add("lelegzik1");
    festeklent.classList.add("lelegzik2");
    toltes();
}, 1500);

function toltes (){
    toltesInterval = setInterval(() => {
        if (toltesertek < 240) {
            toltesertek = toltesertek + 2.4;
            toltosav.style.width = toltesertek + "px";
            szazalek = szazalek + 1;
            toltofelirat.innerText = `${szazalek}%`;
        } else {
            clearInterval(toltesInterval);
            kesz();
        }
    }, 30)
}

function kesz (){
    felirat.classList.remove("beat");
    festekfent.classList.remove("lelegzik1");
    festeklent.classList.remove("lelegzik2");

    tolto.style.opacity = "0";

    felirat.classList.add("animout");
    festekfent.classList.add("animout");
    festeklent.classList.add("animout");
    loaderContent.style.opacity = "0";

    setTimeout(() => {
        loaderContent.style.display = "none";
    }, 1000)
};