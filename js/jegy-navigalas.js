const ticketButtons = document.querySelectorAll(".jegy-gomb");
const ticketButtonsP = document.querySelectorAll(".ticket");

ticketButtons.forEach(button => {
    button.addEventListener("click", event => {
        const id = button.dataset.id;

        // Csak akkor avatkozunk be JS-sel, ha van megadva data-id
        if (id) {
            event.preventDefault();
            window.location.href = `sites/jegyvasarlas.html?id=${id}`;
        }
        // Ha nincs data-id (pl. a 404.html gombnál), 
        // nem hívunk event.preventDefault()-ot, 
        // így a böngésző a HTML-ben lévő href="404.html" hivatkozást fogja követni.
    });
});
ticketButtonsP.forEach(button => {
    button.addEventListener("click", event => {
        const id = button.dataset.id;

        if (id) {
            event.preventDefault();
            window.location.href = `jegyvasarlas.html?id=${id}`;
        }
    });
});