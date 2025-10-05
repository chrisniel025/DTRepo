const randomNumber = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

function checkGuess() {
  const inputValue = document.getElementById("inputValue").value;
  const guess = parseInt(inputValue);
  const result = document.getElementById("result");

  let isFound = false;
  let position = -1;

  if (guess === "" || isNaN(guess)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  randomNumber.forEach((number, index) => {
    if (number === guess && !isFound) {
      isFound = true;
      position = index;
    }
  });

  if (isFound) {
    result.textContent = "The number you guessed is located at index " + position + ".";
  } else {
    result.textContent = "The number you guessed is not in the array.";
  }
}