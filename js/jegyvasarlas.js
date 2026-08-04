const eventSelect = document.getElementById("event-select");
const eventDate = document.getElementById("event-date");
const eventTime = document.getElementById("event-time");
const eventPlace = document.getElementById("event-place");

const ticketList = document.getElementById("ticket-list");
const summaryList = document.getElementById("summary-list");
const totalPrice = document.getElementById("total-price");
const payBtn = document.getElementById("pay-btn");

// Modal elemek
const paymentModal = document.getElementById("payment-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalTotalPrice = document.getElementById("modal-total-price");
const confirmEmail = document.getElementById("confirm-email");

const toStep2Btn = document.getElementById("to-step-2");
const backToStep1Btn = document.getElementById("back-to-step-1");
const processPaymentBtn = document.getElementById("process-payment-btn");
const finishBtn = document.getElementById("finish-btn");

let selectedProgram = null;
let ticketCounts = {};
let currentTotal = 0;

// Programok betöltése a lenyíló listába
if (typeof programs !== "undefined" && programs.length > 0) {
    programs.forEach(program => {
        const option = document.createElement("option");
        option.value = program.id;
        option.textContent = program.name;
        eventSelect.appendChild(option);
    });
}

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
                <button class="minus" data-ticket="${ticket.id}">-</button>
                <span id="count-${ticket.id}">0</span>
                <button class="plus" data-ticket="${ticket.id}">+</button>
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
        const counter = document.getElementById(`count-${ticket.id}`);
        if (counter) {
            counter.textContent = count;
        }

        const row = document.createElement("div");
        row.className = "summary-row";
        row.innerHTML = `
            <span>${ticket.name}${ticket.id.includes("pass") ? ` (${selectedProgram.days} napos)` : ""}</span>
            <span>${count} × ${ticket.price.toLocaleString("hu-HU")} Ft</span>
        `;
        summaryList.appendChild(row);
        total += count * ticket.price;
    });

    currentTotal = total;
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

// Inicializálás
loadProgram(eventSelect.value || (programs.length > 0 ? programs[0].id : 1));

// ==========================================
// FIZETÉSI MODAL LOGIKA
// ==========================================

function goToStep(stepNumber) {
    // Lépések elrejtése/megjelenítése
    document.querySelectorAll(".modal-step").forEach(step => step.classList.remove("active"));
    document.getElementById(`step-${stepNumber}`).classList.add("active");

    // Lépésjelző pöttyök frissítése
    document.querySelectorAll(".step-dot").forEach((dot, idx) => {
        if (idx + 1 <= stepNumber) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// Fizetés gomb nyitja a modalt
payBtn.addEventListener("click", () => {
    if (currentTotal === 0) {
        alert("Kérjük, válassz ki legalább egy jegyet a vásárláshoz!");
        return;
    }
    modalTotalPrice.textContent = `${currentTotal.toLocaleString("hu-HU")} Ft`;
    goToStep(1);
    paymentModal.classList.remove("hidden");
});

// Modal bezárása
function closeModal() {
    paymentModal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);

// 1. Lépésről -> 2. Lépésre
toStep2Btn.addEventListener("click", () => {
    const nameInput = document.getElementById("cust-name");
    const emailInput = document.getElementById("cust-email");

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
        alert("Kérjük, töltsd ki a nevedet és az e-mail címedet!");
        return;
    }

    goToStep(2);
});

// 2. Lépésről <- 1. Lépésre vissza
backToStep1Btn.addEventListener("click", () => {
    goToStep(1);
});

// Szimulált fizetés indítása (2. Lépés -> 3. Lépés)
processPaymentBtn.addEventListener("click", () => {
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const cardExp = document.getElementById("card-exp").value;
    const cardCvc = document.getElementById("card-cvc").value;

    if (!cardName || !cardNumber || !cardExp || !cardCvc) {
        alert("Kérjük, töltsd ki az összes kártyaadatot!");
        return;
    }

    // Töltési animáció szimulálása
    processPaymentBtn.textContent = "Feldolgozás...";
    processPaymentBtn.disabled = true;

    setTimeout(() => {
        const emailInput = document.getElementById("cust-email").value;
        confirmEmail.textContent = emailInput;

        processPaymentBtn.textContent = "Fizetés indítása";
        processPaymentBtn.disabled = false;

        goToStep(3);
    }, 1500); // 1.5 másodperc várakozási idő a valósághűségért
});

// Befejezés gomb (reseteli és bezárja a folyamatot)
finishBtn.addEventListener("click", () => {
    closeModal();
    // Visszaállítjuk a jegyszámokat 0-ra
    loadProgram(eventSelect.value);
});