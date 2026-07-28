const eventSelect = document.getElementById("event-select");
const eventDate = document.getElementById("event-date");
const eventTime = document.getElementById("event-time");
const eventPlace = document.getElementById("event-place");

const ticketList = document.getElementById("ticket-list");
const summaryList = document.getElementById("summary-list");
const totalPrice = document.getElementById("total-price");

let selectedProgram = null;
let ticketCounts = {};

// Programok betöltése a lenyíló listába
programs.forEach(program => {
    const option = document.createElement("option");

    option.value = program.id;
    option.textContent = program.name;

    eventSelect.appendChild(option);
});

// URL paraméter kezelése
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

if (id) {
    eventSelect.value = id;
}

// Jegyek kirajzolása
function renderTickets() {
    ticketList.innerHTML = "";
    ticketCounts = {};
    selectedProgram.tickets.forEach(ticket => {
        ticketCounts[ticket.id] = 0;

        const article = document.createElement("article");
        article.className = "ticket-card";
        article.innerHTML = `
            <div>
                <h2>${ticket.name}${ticket.id.includes("pass") ? ` (${selectedProgram.days} napos)` : ""}</h2>
                <p>${ticket.price.toLocaleString("hu-HU")} Ft</p>
            </div>
            <div class="counter">
                <button
                    class="minus"
                    data-ticket="${ticket.id}">
                    -
                </button>
                <span id="count-${ticket.id}">
                    0
                </span>
                <button
                    class="plus"
                    data-ticket="${ticket.id}">
                    +
                </button>
            </div>`;

        ticketList.appendChild(article);
    });
}

function loadProgram(id) {
    selectedProgram = programs.find(program => program.id === Number(id));
    if (!selectedProgram) return;

    eventDate.textContent = selectedProgram.date;
    eventTime.textContent = selectedProgram.time;
    eventPlace.textContent = selectedProgram.place;

    renderTickets();
    updateSummary();
}

function updateSummary() {
    summaryList.innerHTML = "";
    let total = 0;

    selectedProgram.tickets.forEach(ticket => {
        const count = ticketCounts[ticket.id];
        // Frissítjük a számlálót a kártyán
        const counter = document.getElementById(`count-${ticket.id}`);
        if (counter) {
            counter.textContent = count;
        }
        // Összesítő sor
        const row = document.createElement("div");
        row.className = "summary-row";
        row.innerHTML = `
            <span>${ticket.name}${ticket.id.includes("pass") ? ` (${selectedProgram.days} napos)` : ""}</span>
            <span>${count} × ${ticket.price.toLocaleString("hu-HU")} Ft</span>
        `;
        summaryList.appendChild(row);
        total += count * ticket.price;
    });
    totalPrice.textContent = `${total.toLocaleString("hu-HU")} Ft`;
}

ticketList.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    const ticketId = button.dataset.ticket;
    if (!ticketId) return;
    if (button.classList.contains("plus")) {
        ticketCounts[ticketId]++;
    }
    if (button.classList.contains("minus")) {
        if (ticketCounts[ticketId] > 0) {
            ticketCounts[ticketId]--;
        }
    }
    updateSummary();
});

eventSelect.addEventListener("change", () => {
    loadProgram(eventSelect.value);
});

loadProgram(eventSelect.value || programs[0].id);