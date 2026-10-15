
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const categorySelect = document.getElementById("category");
const addButton = document.getElementById("add-btn");
const entriesList = document.getElementById("entries");

const incomeDisplay = document.getElementById("total-income");
const expenseDisplay = document.getElementById("total-expense");
const balanceDisplay = document.getElementById("balance");

const categoryIcons = {
  Food: "bi-egg-fried",
  Transport: "bi-bus-front",
  Bills: "bi-receipt",
  Education: "bi-book",
  Other: "bi-three-dots"
};

let entries = [];
let chart = null;

function saveEntries() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function loadEntries() {
  const saved = localStorage.getItem("entries");
  if (saved) {
    entries = JSON.parse(saved);
  }
}

function updateChart() {
  if (typeof Chart === "undefined") {
    return;
  }

  const totals = {};
  entries.forEach(function (entry) {
    if (entry.type === "Expense") {
      const category = entry.category || "Other";
      totals[category] = (totals[category] || 0) + entry.amount;
    }
  });

  const labels = Object.keys(totals);
  const values = Object.values(totals);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(document.getElementById("category-chart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{ label: "Spending", data: values, backgroundColor: "#2c7be5" }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function render() {
  entriesList.innerHTML = "";
  let totalIncome = 0;
  let totalExpense = 0;

  entries.forEach(function (entry, index) {
    const category = entry.category || "Other";

    const item = document.createElement("li");

    const info = document.createElement("span");
    const icon = document.createElement("i");
    icon.className = "bi " + (categoryIcons[category] || "bi-three-dots");
    info.appendChild(icon);
    info.appendChild(
      document.createTextNode(
        " " + entry.type + " (" + category + "): " + entry.description + " - " + entry.amount
      )
    );

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="bi bi-trash"></i> Delete';
    deleteButton.addEventListener("click", function () {
      entries.splice(index, 1);
      saveEntries();
      render();
    });

    item.appendChild(info);
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

  updateChart();
}

addButton.addEventListener("click", function () {
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeSelect.value;
  const category = categorySelect.value;

  if (description === "" || amount === "") {
    return;
  }

  entries.push({
    description: description,
    amount: Number(amount),
    type: type,
    category: category
  });

  saveEntries();
  render();

  descriptionInput.value = "";
  amountInput.value = "";
});

loadEntries();
render();