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

// Update flag
const updateFlag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");

  img.setAttribute("src", newSrc);
};

// Convert currency
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");

  // If amount is empty or negative
  if (amount.value === "" || amount.value < 0) {
    amount.value = "1";
  }

  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();

  // Current API structure:
  // /usd.json
  // /eur.json
  // /pkr.json

  const URL = `${BASE_URL}/${from}.json`;

  try {
    let response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Currency API request failed");
    }

    let data = await response.json();

    // Example:
    // data.usd.pkr
    let rate = data[from][to];

    let finalAmount = amount.value * rate;

    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(
      2
    )} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
    msg.innerText = "Unable to get exchange rate. Please try again.";
  }
});