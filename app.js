const calculator = document.querySelector(".calc-body");
const buttons = calculator.querySelectorAll("button");
const display = calculator.querySelector("#numbers");
const operatorButtons = document.querySelectorAll('[data-type="operator"]');

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === "add") {
    return add(num1, num2);
  } else if (operator === "subtract") {
    return subtract(num1, num2);
  } else if (operator === "multiply") {
    return multiply(num1, num2);
  } else if (operator === "divide") {
    return divide(num1, num2);
  }
}

function roundToFour(result) {
  return +(Math.round(result + "e+4") + "e-4");
}

function displayNum() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonValue = button.textContent;
      const displayValue = display.textContent;
      const { type } = button.dataset;
      const { previousKeyType } = calculator.dataset;

      if (type === "digit") {
        if (
          displayValue === "0" ||
          previousKeyType === "operator" ||
          previousKeyType === "equal"
        ) {
          display.textContent = buttonValue;
        } else {
          display.textContent = displayValue + buttonValue;
        }
      }

      if (type === "operator") {
        operatorButtons.forEach((button) => {
          button.dataset.state = "";
        });
        button.dataset.state = "selected";

        calculator.dataset.num1 = displayValue;
        calculator.dataset.operator = button.dataset.key;
      }

      if (type === "equal") {
        const num1 = parseInt(calculator.dataset.num1);
        const num2 = parseInt(displayValue);
        const operator = calculator.dataset.operator;
        let result = operate(operator, num1, num2);

        if (result === Infinity) {
          display.textContent = Infinity;
        } else if (Number.isNaN(result)) {
          display.textContent = "Error";
        } else {
          display.textContent = roundToFour(result);
        }
      }

      if (type === "clear") {
        display.textContent = "0";
        delete calculator.dataset.num1;
        delete calculator.dataset.operator;
      }
      calculator.dataset.previousKeyType = type;
    });
  });
}

displayNum();
