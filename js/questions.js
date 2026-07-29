const gomb = document.querySelector(".q-btn")
const valaszok = document.querySelectorAll(".valasz")
const kerdesek = document.querySelectorAll(".kerdes")
const modal = document.querySelector(".q-modal")
const faq = document.querySelector(".faq")

gomb.addEventListener("click", function(){
    modal.hidden = !modal.hidden
});


kerdesek.forEach(function(kerdes){
    kerdes.addEventListener("click", function(){
        const valasz = kerdes.nextElementSibling;
        const nyitvaVolt = !valasz.hidden;

        valaszok.forEach(function(valasz){
            valasz.hidden = true;
        });
        
        if(!nyitvaVolt){
        valasz.hidden = false;
        }
             
    });
});

document.addEventListener("click", function(event){
    if(!modal.hidden && !faq.contains(event.target)){
        modal.hidden = true;

        valaszok.forEach(function(valasz){
            valasz.hidden = true;
        });
    }
});
