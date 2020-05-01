import { getCurrencyRatio, resetResult, roundToFour } from "./module.js";

const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");

const switchCurrency = document.querySelector("#ex-box i");
const calculateCurrency = document.querySelector("#convert-box i");

const amountInputValue = document.getElementById("amount-input");
const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");

const conversationResultBox = document.getElementById(
  "conversation-result-box"
);
const resetBtn = document.querySelector("button");

let lastUpdate = "";
let currencyRatio = [];

fetch("https://api.exchangeratesapi.io/latest")
  .then((res) => res.json())
  .then((data) => {
    let listOfCurrency = data.rates;
    lastUpdate = data.date;
    for (const property in listOfCurrency) {
      let id = property.toLowerCase();
      fromCurrency.innerHTML += `<option id='${id}' >${property}</option>`;
      toCurrency.innerHTML += `<option id='${id}' value = "${property}"></option>`;
      let obj = {
        key: property,
        value: listOfCurrency[property],
      };
      currencyRatio.push(obj);
    }
  });

const resetForm = () => {
  amountInputValue.value = null;
  fromInput.value = "";
  toInput.value = "";
};

const switchInputs = () => {
  let fromInputCurrency = fromInput.value;
  let toInputCurrency = toInput.value;

  fromInput.value = toInputCurrency;
  toInput.value = fromInputCurrency;

  fromInputCurrency = fromInput.value;
  toInputCurrency = toInput.value;
};


// Listeners

switchCurrency.addEventListener("click", () => {
  switchInputs();
});

calculateCurrency.addEventListener("click", () => {
  if (
    amountInputValue.value === null ||
    fromInput.value === "" ||
    toInput.value === ""
  ) {
    alert("Please fill input boxes!!");
  } else {
    let fromInputCurrencyName = fromInput.value;
    let toInputCurrencyName = toInput.value;

    let fromValue = getCurrencyRatio(fromInputCurrencyName, currencyRatio);
    let toValue = getCurrencyRatio(toInputCurrencyName, currencyRatio);

    let result;

    if (toInputCurrencyName === "EUR" && fromInputCurrencyName === "EUR") return;

    if (toInputCurrencyName === "EUR") {
      result = amountInputValue.value / fromValue;
    } else if (fromInputCurrencyName === "EUR") {
      result = amountInputValue.value * toValue;
    } else {
      result = (toValue / fromValue) * amountInputValue.value;
    }

    conversationResultBox.innerHTML = `<h3>For <span>${amountInputValue.value} ${fromInputCurrencyName}</span> you can get <span>${roundToFour(result)} ${toInputCurrencyName}</span>.</h3>
    <h5>* Last updated: <span>${lastUpdate}</span>.</h5>`;
    resetBtn.style.display = "block";
  }
});

resetBtn.addEventListener("click", () => {
  resetResult(resetBtn);
  resetForm();
});
