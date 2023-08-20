// HTML elements
const operationOutput = document.querySelector("#operation");
const resultOutput = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let currentValue = [];
let operationSelected = [];
let valuesObj = {};

// initialize screen
resetDisplay(true);

function resetDisplay(setting) {
  let reset = "0";
  let clear = "";

  if (setting === true) {
    resultOutput.textContent = reset;
  }
  if (resultOutput.textContent === "0" && setting === false) {
    resultOutput.textContent = clear;
  }
  if (resultOutput.textContent === "" && setting === "delete") {
    resultOutput.textContent = reset;
    if (resultOutput.textContent.length === 12) {
      resultOutput.style.fontSize = "2.5em";
    }
    if (resultOutput.textContent.length === 9) {
      resultOutput.style.fontSize = "3em";
    }
  }
  if (setting === "clear") {
    resultOutput.textContent = reset;
    operationOutput.textContent = clear;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleClick(e.target.value);
  });
});

function handleClick(value) {
  resetDisplay(false);
  // add values to array only if the value is one character long. the values of operations are written in letters
  if (value.length === 1) {
    currentValue.push(value);
    resultOutput.textContent += value;
  }

  if (value === "comma") {
    currentValue.push(",");
    resultOutput.innerHTML += "<span>,</span>";
  }

  // fix display
  if (resultOutput.textContent.length === 10) {
    resultOutput.style.fontSize = "2.5em";
  }
  if (resultOutput.textContent.length === 13) {
    resultOutput.style.fontSize = "2em";
  }

  // clear and remove all values
  if (value === "clear") {
    valuesObj = {};
    currentValue = [];
    resetDisplay("clear");
  }

  // delete a number
  if (value === "delete") {
    currentValue.pop();
    resultOutput.textContent = resultOutput.textContent.substring(
      0,
      resultOutput.textContent.length - 1
    );
    if (currentValue.length === 0) {
      resetDisplay("delete");
    }
  }

  // handle operations
  if (
    value.length > 2 &&
    value !== "clear" &&
    value !== "delete" &&
    value !== "comma"
  ) {
    if (value === "equal" && !operationSelected.includes("equal")) {
      operationSelected.push(value);
    }
    if (value !== "equal") {
      operationSelected = [];
      operationSelected.push(value);
    }

    handleCalculation();
  }
}

function handleCalculation() {
  let mathSymbols = {
    addition: "+",
    subtraction: "-",
    multiplication: "*",
    division: "÷",
    modulus: "%",
  };
  if (currentValue.includes(",")) {
    let floatNumber = Number(
      `${currentValue
        .slice(0, currentValue.indexOf(","))
        .join("")}.${currentValue
        .slice(currentValue.indexOf(",") + 1, currentValue.length)
        .join("")}`
    );
    currentValue = floatNumber;
  } else {
    currentValue = Number(currentValue.join(""));
  }
  if ("value1" in valuesObj || valuesObj.value1 === 0) {
    valuesObj["value2"] = undefined;
    valuesObj["value2"] = currentValue;
    currentValue = [];
  } else if (
    Object.keys(valuesObj).length === 0 &&
    valuesObj.constructor === Object
  ) {
    valuesObj["value1"] = currentValue;
    currentValue = [];
  }
  resetDisplay(true);
  operationOutput.textContent = `${valuesObj.value1}${
    mathSymbols[operationSelected[0]]
  }`;
  if (operationSelected.length === 2) {
    showResult();
  }
}

function showResult() {
  let result = performOperation(
    operationSelected[0],
    valuesObj.value1,
    valuesObj.value2
  );
  resultOutput.textContent = result;
  valuesObj.value1 = result;
}

function performOperation(operation, value1, value2) {
  switch (operation) {
    case "addition":
      operationOutput.textContent += `${valuesObj.value2}=`;
      return value1 + value2;
    case "subtraction":
      operationOutput.textContent += `${valuesObj.value2}=`;
      return value1 - value2;
    case "multiplication":
      operationOutput.textContent += `${valuesObj.value2}=`;
      return value1 * value2;
    case "division":
      operationOutput.textContent += `${valuesObj.value2}=`;
      return value1 / value2;
    case "modulus":
      operationOutput.textContent += `${valuesObj.value2}=`;
      return value1 % value2;
    default:
      break;
  }
}
