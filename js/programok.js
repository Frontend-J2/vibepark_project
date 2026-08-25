const programs = [
    {
        id: 1,
        name: "Neon Beats Live Dj Nórival",
        date: "2026. SZEPTEMBER 8.",
        time: "20:00",
        place: "Vibe Park Budapest",
        image: "img/koncertek/belteri.png",
        days: 1,
        tickets: [
            {
                id: "full",
                name: "Teljes árú",
                price: 6000
            },
            {
                id: "discount",
                name: "Kedvezményes",
                price: 4500
            }
        ]
    },

    {
        id: 2,
        name: "Dübörgő Éjszakák",
        date: "2026. SZEPTEMBER 22.",
        time: "21:00",
        place: "Vibe Park Budapest",
        image: "img/koncertek/elozene.png",
        days: 1,
        tickets: [
            {
                id: "full",
                name: "Teljes árú",
                price: 6500
            },
            {
                id: "discount",
                name: "Kedvezményes",
                price: 5000
            }
        ]
    },

    {
        id: 3,
        name: "Autumn Fest 2026",
        date: "2026. SZEPTEMBER 30.",
        time: "18:00",
        place: "Vibe Park Budapest",
        image: "img/koncertek/este.png",
        days: 3,
        tickets: [
            {
                id: "full",
                name: "Teljes árú",
                price: 8000
            },
            {
                id: "discount",
                name: "Kedvezményes",
                price: 6500
            },
            {
                id: "full-pass",
                name: "Teljes árú bérlet",
                price: 18000
            },
            {
                id: "discount-pass",
                name: "Kedvezményes bérlet",
                price: 15000
            }
        ]
    },

    {
        id: 4,
        name: "Chill Fest 2026 - Szabadtéri",
        date: "2026. OKTÓBER 20.",
        time: "16:00",
        place: "Vibe Park Budapest",
        image: "img/koncertek/szabadter.png",
        days: 1,
        tickets: [
            {
                id: "full",
                name: "Teljes árú",
                price: 7000
            },
            {
                id: "discount",
                name: "Kedvezményes",
                price: 5500
            }
        ]
    },

    {
        id: 5,
        name: "Neon Beats Live Dj Zsoltival",
        date: "2026. NOVEMBER 15.",
        time: "20:00",
        place: "Vibe Park Budapest",
        image: "img/koncertek/belteri2.png",
        days: 1,
        tickets: [
            {
                id: "full",
                name: "Teljes árú",
                price: 6000
            },
            {
                id: "discount",
                name: "Kedvezményes",
                price: 4500
            }
        ]
    },

    {
        id: 6,
        name: "Midnight Echo",
        date: "2026. SZEPTEMBER 05.",
        time: "23:00",
        place: "Vibe Park Budapest",
        image: "img/koncertek/belteri2.png",
        days: 1,
        tickets: [
            {
                id: "full",
                name: "Teljes árú",
                price: 9990
            },
            {
                id: "discount",
                name: "Kedvezményes",
                price: 4500
            }
        ]
    }
];

const koncert = document.querySelectorAll(".koncert")
const info = document.querySelectorAll(".koncertInfo")
const adatok = document.querySelectorAll(".adatok")
const coming = document.getElementById("showMoreBtn")
const morekoncert = document.querySelector("#moreKoncert")
const error = document.querySelector(".ticket-error")
const ticket = document.querySelectorAll(".ticket")
const nemelerheto = document.querySelectorAll(".ticket-nem")

info.forEach(function(gomb){
    gomb.addEventListener("click", function(){
        const koncert = gomb.closest(".koncert");
        const adatok = koncert.querySelector(".adatok");

        adatok.hidden = !adatok.hidden;
    });
});

coming.addEventListener("click", function(){
    morekoncert.hidden = !morekoncert.hidden
    
    if(!morekoncert.hidden){
    coming.innerText = "Kevesebb program";
}else {
    coming.innerText = "Coming soon..."
}
    
});

error.addEventListener("click", function(){
    window.location.href = "../404.html";
});

ticket.forEach(function(gomb){
    gomb.addEventListener("click", function(){
        window.location.href = "jegyvasarlas.html";
    });
});

nemelerheto.forEach(function (gomb){
    gomb.addEventListener("click", function(){
        if(gomb.innerText === "Jegyvásárlás"){
            gomb.innerText = "Nem elérhető!";
        }else {
            gomb.innerText = "Jegyvásárlás"
        }
    });
});