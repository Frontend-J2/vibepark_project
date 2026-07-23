const gomb = document.querySelector(".q-btn")
const questions = document.querySelector(".questions-szulo")
const kerdesek = document.querySelectorAll(".kerdes")


gomb.addEventListener("click", function(){
    questions.hidden = !questions.hidden
});

gomb.addEventListener("click", function(kerdes){
    kerdes.hidden = !kerdes.hidden
});

kerdesek.forEach(function(kerdes){
    kerdes.addEventListener("click", function(){

    });
});