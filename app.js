// const from = document.querySelector("#from-box");
// const to = document.querySelector("#to-box");
let fromCurrency = document.getElementById('from')
let toCurrency = document.getElementById('to')

// console.log (fromCurrency, toCurrency)


fetch("https://api.exchangeratesapi.io/latest")
  .then((res) => res.json())
  .then((data) => {
    let listOfCurrency = data.rates;

    for (const property in listOfCurrency) {
      let id = property.toLowerCase();
      fromCurrency.innerHTML += `<option id='${id}' value = "${property}"></option>`;
      console.log(`${property}: ${listOfCurrency[property]}`);
    toCurrency.innerHTML += `<option id='${id}' value = "${property}"></option>`;

    }
    // console.log(listOfCurrency.CAD)
  });
