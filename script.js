const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Add currencies to dropdowns
for (let select of dropdown) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");

    newOption.value = currcode;
    newOption.innerText = currcode;

    select.appendChild(newOption);

    // Default currencies
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currcode === "PKR") {
      newOption.selected = true;
    }
  }

  // Update flag when currency changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
