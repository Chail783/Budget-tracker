
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("add-btn");
const entriesList = document.getElementById("entries");

const incomeDisplay = document.getElementById("total-income");
const expenseDisplay = document.getElementById("total-expense");
const balanceDisplay = document.getElementById("balance");

let entries = [];

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
  const saved = localStorage.getItem("entries");
  if (saved) {
    entries = JSON.parse(saved);
  }
}

function render() {
  entriesList.innerHTML = "";
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach(function (entry, index) {
    const item = document.createElement("li");
    item.textContent = entry.type + ": " + entry.description + " - " + entry.amount + " ";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      entries.splice(index, 1);
      saveEntries();
      render();
    });

    item.appendChild(deleteButton);
    entriesList.appendChild(item);

    if (entry.type === "Income") {
      totalIncome = totalIncome + entry.amount;
    } else {
      totalExpense = totalExpense + entry.amount;
    }
  });

  incomeDisplay.textContent = totalIncome;
  expenseDisplay.textContent = totalExpense;
  balanceDisplay.textContent = totalIncome - totalExpense;
}

addButton.addEventListener("click", function () {
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeSelect.value;

  if (description === "" || amount === "") {
    return;
  }

  entries.push({
    description: description,
    amount: Number(amount),
    type: type
  });

  saveEntries();
  render();

  descriptionInput.value = "";
  amountInput.value = "";
});

loadEntries();
render();