const kerdesek = document.querySelectorAll(".kerdes");
const valaszok = document.querySelectorAll(".valasz");

kerdesek.forEach(function(kerdes){
    kerdes.addEventListener("click", function(){
        const valasz = kerdes.nextElementSibling;
        const nyitvaVolt = !valasz.hidden;

        // Összes többi válasz bezárása (harmónika effekt)
        valaszok.forEach(function(v){
            v.hidden = true;
        });
        
        // Ha az adott kérdés nem volt nyitva, most kinyitjuk
        if(!nyitvaVolt){
            valasz.hidden = false;
        }
    });
});