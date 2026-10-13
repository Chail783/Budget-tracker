const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("add-btn");
const entriesList = document.getElementById("entries");

const incomeDisplay = document.getElementById("total-income");
const expenseDisplay = document.getElementById("total-expense");
const balanceDisplay = document.getElementById("balance");

let totalIncome = 0;
let totalExpense = 0;

addButton.addEventListener("click", function () {
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeSelect.value;

  if (description === "" || amount === "") {
    return;
  }

  const amountNumber = Number(amount);

  if (type === "Income") {
    totalIncome = totalIncome + amountNumber;
  } else {
    totalExpense = totalExpense + amountNumber;
  }

  incomeDisplay.textContent = totalIncome;
  expenseDisplay.textContent = totalExpense;
  balanceDisplay.textContent = totalIncome - totalExpense;

  const item = document.createElement("li");
  item.textContent = type + ": " + description + " - " + amount;
  entriesList.appendChild(item);

  descriptionInput.value = "";
  amountInput.value = "";
});