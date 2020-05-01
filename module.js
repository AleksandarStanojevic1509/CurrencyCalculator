export const getCurrencyRatio = (input, ratio) => {
  let value;
  ratio.forEach((event) => {
    if (input) {
      if (event.key === input) {
        value = event.value;
      }
    }
  });
  return value;
};

export let resetResult = (resetBtn) => {
  const resultText = document.querySelector("#conversation-result-box h3");
  const lastUpdateText = document.querySelector("#conversation-result-box h5");
  resetBtn.style.display = "none";
  resultText.style.display = "none";
  lastUpdateText.style.display = "none";
};

export const roundToFour = (num) => {
    return +(Math.round(num + "e+4") + "e-4");
  };
  