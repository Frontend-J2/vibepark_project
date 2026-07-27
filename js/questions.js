const gomb = document.querySelector(".q-btn")
const kerdesek = document.querySelectorAll(".kerdes")
const valaszok = document.querySelectorAll(".valasz")
const modal = document.querySelector(".q-modal")

gomb.addEventListener("click", function(){
    modal.hidden = !modal.hidden;
});



kerdesek.forEach(function(kerdes){
    kerdes.addEventListener("click", function(){
        const valasz = kerdes.nextElementSibling;
        valasz.hidden = !valasz.hidden;
    });
});




