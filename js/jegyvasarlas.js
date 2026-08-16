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
// VALIDÁCIÓS FÜGGVÉNYEK
// ==========================================
const validators = {
    name: (val) => {
        const regex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,}(\s+[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,})+$/;
        return regex.test(val.trim());
    },
    email: (val) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(val.trim());
    },
    cardNumber: (val) => {
        const cleanVal = val.replace(/\s+/g, '');
        return /^\d{16}$/.test(cleanVal);
    },
    cardExp: (val) => {
        const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        const match = val.match(regex);
        if (!match) return false;

        const month = parseInt(match[1], 10);
        const year = parseInt("20" + match[2], 10);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;

        return true;
    },
    cardCvc: (val) => {
        return /^\d{3}$/.test(val.trim());
    }
};

// Segédfüggvény a mezők vizuális ellenőrzésére
function validateField(inputId, isValid) {
    const input = document.getElementById(inputId);
    const parentGroup = input.closest('.form-group');

    if (!isValid) {
        input.classList.add("error");
        if (parentGroup) parentGroup.classList.add("has-error");
    } else {
        input.classList.remove("error");
        if (parentGroup) parentGroup.classList.remove("has-error");
    }

    // Ha elkezd gépelni, tüntessük el a piros hibát
    input.addEventListener("input", () => {
        input.classList.remove("error");
        if (parentGroup) parentGroup.classList.remove("has-error");
    }, { once: true });

    return isValid;
}

// ==========================================
// FIZETÉSI MODAL LOGIKA
// ==========================================

function goToStep(stepNumber) {
    document.querySelectorAll(".modal-step").forEach(step => step.classList.remove("active"));
    document.getElementById(`step-${stepNumber}`).classList.add("active");

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

// 1. LÉPÉSRŐL -> 2. LÉPÉSRE (Piros kijelöléssel)
toStep2Btn.addEventListener("click", () => {
    const nameInput = document.getElementById("cust-name");
    const emailInput = document.getElementById("cust-email");

    const isNameValid = validateField("cust-name", validators.name(nameInput.value));
    const isEmailValid = validateField("cust-email", validators.email(emailInput.value));

    // Ha bármelyik hibás, elakad a folyamat
    if (!isNameValid || !isEmailValid) {
        return;
    }

    goToStep(2);
});

// 2. Lépésről <- 1. Lépésre vissza
backToStep1Btn.addEventListener("click", () => {
    goToStep(1);
});

// 2. LÉPÉSRŐL -> 3. LÉPÉSRE (Piros kijelöléssel)
processPaymentBtn.addEventListener("click", () => {
    const cardName = document.getElementById("card-name");
    const cardNumber = document.getElementById("card-number");
    const cardExp = document.getElementById("card-exp");
    const cardCvc = document.getElementById("card-cvc");

    const isCardNameValid = validateField("card-name", validators.name(cardName.value));
    const isCardNumValid = validateField("card-number", validators.cardNumber(cardNumber.value));
    const isCardExpValid = validateField("card-exp", validators.cardExp(cardExp.value));
    const isCardCvcValid = validateField("card-cvc", validators.cardCvc(cardCvc.value));

    if (!isCardNameValid || !isCardNumValid || !isCardExpValid || !isCardCvcValid) {
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
    }, 1500);
});

// Befejezés gomb
finishBtn.addEventListener("click", () => {
    closeModal();
    loadProgram(eventSelect.value);
});

// Automatikus input formázások gépelés közben
document.getElementById("card-number").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = formatted;
});

document.getElementById("card-exp").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
        e.target.value = value;
    }
});