const ticketButtons = document.querySelectorAll(".jegy-gomb, .ticket");

ticketButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        const id = button.dataset.id;
        window.location.href = `sites/jegyvasarlas.html?id=${id}`;
    });
});