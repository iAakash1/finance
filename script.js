let transactions = [];
let removedTransaction = null;

class TransactionNode {
    constructor(amount, type, date, category, description) {
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.category = category;
        this.description = description;
    }
}

document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addTransaction();
});

function validateDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Compare only dates, ignoring the time

    return (
        year >= 1950 &&
        year <= 2024 &&
        month >= 0 && 
        month <= 11 && 
        day >= 1 &&
        day <= 31 &&
        date <= currentDate // Ensures date is not beyond the current date
    );
}

function addTransaction() {
    const type = document.getElementById("type").value.trim().toLowerCase();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value.trim();
    const category = document.getElementById("category").value.trim();
    const description = document.getElementById("description").value.trim();

    if (type !== "income" && type !== "expense") {
        displayMessage("Invalid type: Must be 'income' or 'expense'.");
        return;
    }

    if (!validateDate(date)) {
        displayMessage("Invalid date: Use YYYY-MM-DD between 1950 and the current date.");
        return;
    }

    const transaction = new TransactionNode(amount, type, date, category, description);
    transactions.push(transaction);
    displayMessage("Transaction added successfully.");
    displayTransactions();
    clearForm();
}

function removeTopTransaction() {
    if (transactions.length === 0) {
        displayMessage("No transactions to remove.");
        return;
    }
    removedTransaction = transactions.pop();
    displayMessage("Transaction removed successfully.");
    displayTransactions();
}

function viewLastTransaction() {
    if (transactions.length === 0) {
        displayMessage("No transactions available.");
        return;
    }
    const lastTransaction = transactions[transactions.length - 1];
    displayTransactionDetails(lastTransaction);
}

function clearAllTransactions() {
    transactions = [];
    displayMessage("All transactions cleared.");
    displayTransactions();
}

function getBalance() {
    let balance = 0;
    for (const transaction of transactions) {
        if (transaction.type === "income") balance += transaction.amount;
        else if (transaction.type === "expense") balance -= transaction.amount;
    }
    displayMessage(`Current Balance: $${balance.toFixed(2)}`);
    return balance;
}

function displayTransactions() {
    const transactionsList = document.getElementById("transactionsList");
    transactionsList.innerHTML = "";
    if (transactions.length === 0) {
        transactionsList.textContent = "No transactions available.";
        return;
    }
    for (const transaction of transactions) {
        const transactionItem = document.createElement("li");
        transactionItem.textContent = `Amount: $${transaction.amount}, Type: ${transaction.type}, Date: ${transaction.date}, Category: ${transaction.category}, Description: ${transaction.description}`;
        transactionsList.appendChild(transactionItem);
    }
}

function undoLatestRemovedTransaction() {
    if (removedTransaction === null) {
        displayMessage("No transaction to undo.");
        return;
    }
    transactions.push(removedTransaction);
    displayMessage("Transaction restored successfully.");
    displayTransactions();
    removedTransaction = null;
}

function getTotalTransactions() {
    const totalTransactions = transactions.length;
    displayMessage(`Total Transactions: ${totalTransactions}`);
    return totalTransactions;
}

function tellPositiveOrNegative() {
    let income = 0, expense = 0;
    for (const transaction of transactions) {
        if (transaction.type === "income") income += transaction.amount;
        else if (transaction.type === "expense") expense += transaction.amount;
    }
    if (income > expense) {
        displayMessage("Income is more than expenses. Good!");
    } else if (income === expense) {
        displayMessage("It's a balance between income and expenses.");
    } else {
        displayMessage("Expenses are more than income. Be cautious!");
    }
}

function displayTransactionDetails(transaction) {
    displayMessage(`Amount: $${transaction.amount}, Type: ${transaction.type}, Date: ${transaction.date}, Category: ${transaction.category}, Description: ${transaction.description}`);
}

function displayMessage(message) {
    document.getElementById("message").textContent = message;
}

function clearForm() {
    document.getElementById("type").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
}
