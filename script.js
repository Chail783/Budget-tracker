const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("add-btn");
const entriesList = document.getElementById("entries");

addButton.addEventListener("click", function () {
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeSelect.value;

  const item = document.createElement("li");
  item.textContent = type + ": " + description + " - " + amount;
  entriesList.appendChild(item);
});