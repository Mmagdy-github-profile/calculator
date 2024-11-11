const themToggle = document.querySelector(".theme__toggle");
const toggleTheme = () => {
  themToggle.classList.toggle("theme__toggle--isActive");
};
const keyDown = (event) => {
  event.key === "Enter" && toggleTheme();
};
themToggle.addEventListener("keydown", keyDown);
themToggle.addEventListener("click", toggleTheme);

// creat calcutor
let storedNumber = "";
let currentNumber = "";
let Opration = "";
const cardResult = document.querySelector(".card__result");
const calcKey = document.querySelectorAll("[data-type]");

const updetScreen = (value) => {
  cardResult.innerText = !value ? "0" : value;
};
const numberHandelr = (value) => {
  if (value == "." && currentNumber.includes(".")) return;
  if (value == "0" && !currentNumber) return;
  currentNumber += value;
  updetScreen(currentNumber);
};
const reasetHandelr = () => {
  storedNumber = "";
  currentNumber = "";
  Opration = "";
  updetScreen(currentNumber);
};
const deletButtnHandelr = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length == 1) {
    currentNumber = "";
    updetScreen(currentNumber);
  } else if (currentNumber.length > 1) {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    updetScreen(currentNumber);
  }
};
const executeDperation = () => {
  if (currentNumber && storedNumber && Opration) {
    switch (Opration) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updetScreen(storedNumber);
  }
};
const oprationButtonHndler = (oprationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    Opration = oprationValue;
  } else if (storedNumber) {
    Opration = oprationValue;
    if (currentNumber) executeDperation();
  }
};
calcKey.forEach((element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberHandelr(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          reasetHandelr();
          break;
        case "Backspace":
          deletButtnHandelr();
          break;
        case "Enter":
          executeDperation();
          break;
        default:
          oprationButtonHndler(element.dataset.value);
      }
    }
  });
});

// Use Keypoed as input saurs
const availabelNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availabelOpration = ["+", "-", "*", "/"];
const avilabelKeys = [
  ...availabelNumbers,
  ...availabelOpration,
  "Backspace",
  "Enter",
  "c",
];
window.addEventListener("keydown", (event) => {
  keyWordWithHover(event.key);
});

const keyWordWithHover = (key) => {
  if (avilabelKeys.includes(key)) {
    let ele = document.querySelector(`[data-value = "${key}"]`);
    ele.classList.add("hover");
    ele.click();
    setTimeout(() => ele.classList.remove("hover"), 100);
  }
};
