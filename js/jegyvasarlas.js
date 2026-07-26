const eventSelect = document.getElementById("event-select");
const eventDate = document.getElementById("event-date");
const eventTime = document.getElementById("event-time");
const fullPrice = document.getElementById("full-price");
const discountPrice = document.getElementById("discount-price");
const fullCount = document.getElementById("full-count");
const discountCount = document.getElementById("discount-count");
const summaryFull = document.getElementById("summary-full");
const summaryDiscount = document.getElementById("summary-discount");
const totalPrice = document.getElementById("total-price");
const eventPlace = document.getElementById("event-place");

let selectedProgram;
let fullTickets = 0;
let discountTickets = 0;

programs.forEach(program => {
    const option = document.createElement("option");
    option.value = program.id;
    option.textContent = program.name;
    eventSelect.appendChild(option);
});

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

if (id) {
    eventSelect.value = id;
}

function loadProgram(id) {
    selectedProgram = programs.find(program => program.id === Number(id));
    if (!selectedProgram) return;

    eventDate.textContent = selectedProgram.date;
    eventTime.textContent = selectedProgram.time;
    eventPlace.textContent = selectedProgram.place;
    fullPrice.textContent = `${selectedProgram.prices.full.toLocaleString("hu-HU")} Ft`;
    discountPrice.textContent = `${selectedProgram.prices.discount.toLocaleString("hu-HU")} Ft`;

    fullTickets = 0;
    discountTickets = 0;

    updateSummary();
}

function updateSummary() {
    fullCount.textContent = fullTickets;
    discountCount.textContent = discountTickets;

    summaryFull.textContent = `${fullTickets} × ${selectedProgram.prices.full.toLocaleString("hu-HU")} Ft`;
    summaryDiscount.textContent = `${discountTickets} × ${selectedProgram.prices.discount.toLocaleString("hu-HU")} Ft`;

    const total = fullTickets * selectedProgram.prices.full + discountTickets * selectedProgram.prices.discount;
    totalPrice.textContent = `${total.toLocaleString("hu-HU")} Ft`;
}

eventSelect.addEventListener("change", () => {
    loadProgram(eventSelect.value);
});

document.querySelectorAll(".plus").forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.type === "full") {
            fullTickets++;
        } else {
            discountTickets++;
        }
        updateSummary();
    });
});

document.querySelectorAll(".minus").forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.type === "full" && fullTickets > 0) {
            fullTickets--;
        }
        if (button.dataset.type === "discount" && discountTickets > 0) {
            discountTickets--;
        }
        updateSummary();
    });
});

loadProgram(eventSelect.value || programs[0].id);