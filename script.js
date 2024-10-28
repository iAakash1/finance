let transactions = [];

document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addTransaction();
});

function validateDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!dateString.match(regex)) {
        return false;
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return (
        year >= 1950 &&
        year <= 2024 &&
        month >= 0 && month <= 11 &&
        day >= 1 && day <= 31
    );
}

function addTransaction() {
    const type = document.getElementById("type").value.trim().toLowerCase();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value.trim();
    const category = document.getElementById("category").value.trim();
    const description = document.getElementById("description").value.trim();

    if (type !== "income" && type !== "expense") {
        displayMessage("Type must be either 'income' or 'expense'.");
        return;
    }

    if (!validateDate(date)) {
        displayMessage("Invalid date. Please enter a date in YYYY-MM-DD format between 1950 and 2024.");
        return;
    }

    const transaction = { type, amount, date, category, description };
    transactions.push(transaction);
    displayMessage("Transaction added successfully!");
    displayTransactions();
    clearForm();
}

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}

function displayTransactions() {
    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transaction");
        transactionDiv.textContent = `Transaction ${index + 1}: ${transaction.type}, Amount: ${transaction.amount}, Date: ${transaction.date}, Category: ${transaction.category}, Description: ${transaction.description}`;
        transactionList.appendChild(transactionDiv);
    });
}

function clearForm() {
    document.getElementById("type").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
}
