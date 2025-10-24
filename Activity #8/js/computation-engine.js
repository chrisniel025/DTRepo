function createCalculator(displayValue, counterValue) {
  let expression = "";
  let shiftMode1 = false;
  const counter = createCounter();
  const expressionChars = new Set(["+", "-", "*", "/", ".", "(", ")"]);

  function updateDisplay() {
    displayValue.value = expression;
  }

  function createCounter() {
    let count = 0;

    return function() {
      count++;
      return count;
    };
  }

  function updateCalculationCount() {
    const calculationCount = counter();
    counterValue.textContent = `Total Calculations: ${calculationCount}`;
  }

  function addToExpression(input) {
    if (expression === "0" && !expressionChars.has(input)) {
      expression = input;
    } else {
      expression += input;
    }

    updateDisplay();
  }

  function showConstantValue(constant) {
    if (constant === "π") {
      expression += eval("Math.PI");
    } else if (constant === "e") {
      expression += eval("Math.E");
    }

    updateDisplay();
  }

  function addFunction(func) {
    if (func === "|x|") {
      expression += "abs(";
    } else if (func === "1/x") {
      expression += "1/(";
    } else if (func === "⌊x⌋") {
      expression += "floor(";
    } else if (func === "⌈x⌉") {
      expression += "ceil(";
    } else if (func === "rand") {
      expression += eval(Math.random());
    } else if (func === "→dms") {
      expression += "dms(";
    } else if (func === "→deg") {
      expression += "degrees(";
    } else if (func === "rnd") {
      expression += "round(";
    }

    updateDisplay();
  }

  function toDMS(deg) {
      const d = Math.floor(deg);
      const m = (deg - d) * 60;
      return +(d + m / 100).toFixed(2);
  }

  function toDeg(dms) {
      const d = Math.floor(dms);
      const m = dms - d;
      return +(d + m * 100 / 60).toFixed(6);
  }

  function toggleSign() {
    expression = String(-expression);
    updateDisplay();
  }

  function useNaturalLogToExp() {
    if (shiftMode1) {
      expression += "e^(";
    } else {
      expression += "ln(";
    }

    updateDisplay();
  }

  function useLogBaseChange(btn) {
    if (shiftMode1) {
      // expression += "logʸ(";
    } else {
      expression += "log(";
    }

    updateDisplay();
  }

  function useBaseConversion() {
    if (shiftMode1) {
      expression += "2^(";
    } else {
      expression += "10^(";
    }

    updateDisplay();
  }

  function useRootComparison() {
    if (shiftMode1) {
      expression += "cuberoot(";
    } else {
      expression += "√(";
    }

    updateDisplay();
  }

  function usePowerShift() {
    if (shiftMode1) {
      expression += "cube(";
    } else {
      expression += "sqr(";
    }

    updateDisplay();
  }

  function useTrig(trig){
    const trigMap = {
      "sin": "sin₀(",
      "cos": "cos₀(",
      "tan": "tan₀(",
      "sec": "sec₀(",
      "csc": "csc₀(",
      "cot": "cot₀(",
      "sin⁻¹": "sin⁻¹₀(",
      "cos⁻¹": "cos⁻¹₀(",
      "tan⁻¹": "tan⁻¹₀(",
      "sec⁻¹": "sec⁻¹₀(",
      "csc⁻¹": "csc⁻¹₀(",
      "cot⁻¹": "cot⁻¹₀(",
      "sinh": "sinh(",
      "cosh": "cosh(",
      "tanh": "tanh(",
      "sech": "sech(",
      "csch": "csch(",
      "coth": "coth(",
      "sinh⁻¹": "sinh⁻¹(",
      "cosh⁻¹": "cosh⁻¹(",
      "tanh⁻¹": "tanh⁻¹(",
      "sech⁻¹": "sech⁻¹(",
      "csch⁻¹": "csch⁻¹(",
      "coth⁻¹": "coth⁻¹("
    };

    if (trigMap[trig]) {
      expression += trigMap[trig];
      updateDisplay();
    }
  }

  function isOnlyNumber() {
    const numberPattern = /^[+-]?((\d+(\.\d*)?)|(\.\d+))([eE][+-]?\d+)?$/;

    return numberPattern.test(expression);
  }

  function calculateInput() {
    if (expression !== "" && !isOnlyNumber()) {
      try {
        const exp = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/abs\(/g, "Math.abs(")
          .replace(/floor\(/g, "Math.floor(")
          .replace(/ceil\(/g, "Math.ceil(")
          .replace(/dms\(/g, "toDMS(")
          .replace(/degrees\(/g, "toDeg(")
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(")
          .replace(/e\^\(/g, "Math.exp(")
          .replace(/10\^\(/g, "Math.pow(10,")
          .replace(/2\^\(/g, "Math.pow(2,")
          .replace(/√\(/g, "Math.sqrt(")
          .replace(/cuberoot\(/g, "Math.cbrt(")
          .replace(/sqr\(([^)]+)\)/g, "Math.pow($1, 2)")
          .replace(/cube\(([^)]+)\)/g, "Math.pow($1, 3)")
          .replace(/sin₀\(/g, "(x => Math.sin(x * Math.PI / 180))(")
          .replace(/cos₀\(/g, "(x => Math.cos(x * Math.PI / 180))(")
          .replace(/tan₀\(/g, "(x => Math.tan(x * Math.PI / 180))(")
          .replace(/sec₀\(/g, "(x => 1/Math.cos(x * Math.PI / 180))(")
          .replace(/csc₀\(/g, "(x => 1/Math.sin(x * Math.PI / 180))(")
          .replace(/cot₀\(/g, "(x => 1/Math.tan(x * Math.PI / 180))(")
          .replace(/sin⁻¹₀\(/g, "(x => 180/Math.PI * Math.asin(x))(")
          .replace(/cos⁻¹₀\(/g, "(x => 180/Math.PI * Math.acos(x))(")
          .replace(/tan⁻¹₀\(/g, "(x => 180/Math.PI * Math.atan(x))(")
          .replace(/sec⁻¹₀\(/g, "(x => 180/Math.PI * Math.acos(1/x))(")
          .replace(/csc⁻¹₀\(/g, "(x => 180/Math.PI * Math.asin(1/x))(")
          .replace(/cot⁻¹₀\(/g, "(x => 180/Math.PI * Math.atan(1/x))(")
          .replace(/sinh\(/g, "Math.sinh(")
          .replace(/cosh\(/g, "Math.cosh(")
          .replace(/tanh\(/g, "Math.tanh(")
          .replace(/sech\(/g, "(x => 1/Math.cosh(x))(")
          .replace(/csch\(/g, "(x => 1/Math.sinh(x))(")
          .replace(/coth\(/g, "(x => 1/Math.tanh(x))(")
          .replace(/sinh⁻¹\(/g, "Math.asinh(")
          .replace(/cosh⁻¹\(/g, "Math.acosh(")
          .replace(/tanh⁻¹\(/g, "Math.atanh(")
          .replace(/sech⁻¹\(/g, "(x => Math.acosh(1/x))(")
          .replace(/csch⁻¹\(/g, "(x => Math.asinh(1/x))(")
          .replace(/coth⁻¹\(/g, "(x => Math.atanh(1/x))(")
          .replace(/round\(/g, "Math.round(");

        const result = eval(exp);
        expression = result.toString();

        updateDisplay();
        updateCalculationCount();
      } catch {
        expression = "";
        displayValue.value = "Error";
      }
    }
  }

  function deleteLastCharacter() {
    expression = expression.slice(0, -1);
    updateDisplay();
  }

  function clearInput() {
    expression = "";
    updateDisplay();
  }

  function toggleShift1() {
    shiftMode1 = !shiftMode1;

    document.getElementById("shift1").classList.toggle("shift-active", shiftMode1);
    document.getElementById("btnPowerShift").textContent = shiftMode1 ? "x³" : "x²";
    document.getElementById("btnRootComparison").textContent = shiftMode1 ? "∛x" : "²√x";
    document.getElementById("btnPowerRootInverse").textContent = shiftMode1 ? "ʸ√x" : "xʸ";
    document.getElementById("btnBaseConversion").textContent = shiftMode1 ? "2ˣ" : "10ˣ";
    document.getElementById("btnLogBaseChange").textContent = shiftMode1 ? "logʸx" : "log";
    document.getElementById("btnNaturalLogToExp").textContent = shiftMode1 ? "eˣ" : "ln";
  }

  function toggleShiftHyp(shiftMode2, hypMode){
    let shift2 = document.getElementById("shift2")
    let hyp = document.getElementById("hyp");
    let btnSin = document.getElementById("btnSin");
    let btnCos = document.getElementById("btnCos");
    let btnTan = document.getElementById("btnTan");
    let btnSec = document.getElementById("btnSec");
    let btnCsc = document.getElementById("btnCsc");
    let btnCot = document.getElementById("btnCot");

    if(shiftMode2 === true && hypMode === false) {
      shift2.classList.toggle("shift-active", true);
      hyp.classList.toggle("shift-active", false);
      btnSin.textContent = "sin⁻¹";
      btnCos.textContent = "cos⁻¹";
      btnTan.textContent = "tan⁻¹";
      btnSec.textContent = "sec⁻¹";
      btnCsc.textContent = "csc⁻¹";
      btnCot.textContent = "cot⁻¹";
    } else if (shiftMode2 === true && hypMode === true) {
      shift2.classList.toggle("shift-active", true);
      hyp.classList.toggle("shift-active", true);
      btnSin.textContent = "sinh⁻¹";
      btnCos.textContent = "cosh⁻¹";
      btnTan.textContent = "tanh⁻¹";
      btnSec.textContent = "sech⁻¹";
      btnCsc.textContent = "csch⁻¹";
      btnCot.textContent = "coth⁻¹";
    } else if (shiftMode2 === false && hypMode === true) {
      shift2.classList.toggle("shift-active", false);
      hyp.classList.toggle("shift-active", true);
      btnSin.textContent = "sinh";
      btnCos.textContent = "cosh";
      btnTan.textContent = "tanh";
      btnSec.textContent = "sech";
      btnCsc.textContent = "csch";
      btnCot.textContent = "coth";
    } else {
      shift2.classList.toggle("shift-active", false);
      hyp.classList.toggle("shift-active", false);
      btnSin.textContent = "sin";
      btnCos.textContent = "cos";
      btnTan.textContent = "tan";
      btnSec.textContent = "sec";
      btnCsc.textContent = "csc";
      btnCot.textContent = "cot";
    }
  }

  function handleKeyPress(key) {
    if (!isNaN(key) || expressionChars.has(key)) {
      if(key === "*") key = "×";

      if(key === "/") key = "÷";

      this.addToExpression(key);
    } else if (key === "Enter" || key === "=") {
      this.calculateInput();
    } else if (key === "Backspace") {
      this.deleteLastCharacter();
    } else if (key === "Delete") {
      this.clearInput();
    } else {
      e.preventDefault();
    }
  }

  return {
    addToExpression,
    showConstantValue,
    addFunction,
    toggleSign,
    useNaturalLogToExp,
    useLogBaseChange,
    useBaseConversion,
    useRootComparison,
    usePowerShift,
    useTrig,
    calculateInput,
    deleteLastCharacter,
    clearInput,
    toggleShift1,
    toggleShiftHyp,
    handleKeyPress,
  };
}

const displayValue = document.getElementById("displayValue");
const counterValue = document.getElementById("counterValue");
const shift1 = document.getElementById("shift1");
const shift2 = document.getElementById("shift2");
const hyp = document.getElementById("hyp");
const toggleButton1 = document.getElementById("dropdownToggle1");
const dropdownMenu1 = document.getElementById("dropdownMenu1");
const toggleButton2 = document.getElementById("dropdownToggle2");
const dropdownMenu2 = document.getElementById("dropdownMenu2");
const tooltip = document.getElementById("tooltip");
const buttons = document.querySelectorAll(".tooltip-btn");
const calculator = createCalculator(displayValue, counterValue);

let shiftMode2 = false;
let hypMode = false;

shift1.addEventListener("click", () => calculator.toggleShift1());

shift2.addEventListener("click", () => {
  shiftMode2 = !shiftMode2;
  calculator.toggleShiftHyp(shiftMode2, hypMode);
});

hyp.addEventListener("click", () => {
  hypMode = !hypMode;
  calculator.toggleShiftHyp(shiftMode2, hypMode);
});

toggleButton1.addEventListener("click", () => {
  dropdownMenu1.classList.toggle("hidden");
  toggleButton1.classList.toggle("toggled");
});

toggleButton2.addEventListener("click", () => {
  dropdownMenu2.classList.toggle("hidden");
  toggleButton2.classList.toggle("toggled");
});

window.addEventListener("click", (e) => {
  if (!toggleButton1.contains(e.target) && !dropdownMenu1.contains(e.target)) {
    dropdownMenu1.classList.add("hidden");
    toggleButton1.classList.remove("toggled");
  }

  if (!toggleButton2.contains(e.target) && !dropdownMenu2.contains(e.target)) {
    dropdownMenu2.classList.add("hidden");
    toggleButton2.classList.remove("toggled");
  }
});

document.addEventListener("keydown", (e) => {
  calculator.handleKeyPress(e.key);
});

buttons.forEach(button => {
  button.addEventListener("mouseenter", () => {
    const label = button.textContent;
    if (label === "log") return;

    const rect = button.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    tooltip.style.top = `${rect.top - tooltipRect.height - 6}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
    tooltip.style.opacity = "1";
    tooltip.style.transform = "translateY(0)";
  });

  button.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
    tooltip.style.transform = "translateY(-4px)";
  });
});