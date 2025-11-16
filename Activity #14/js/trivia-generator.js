let currentAnswer = "";

async function newQuestion() {
  try {
    // localhost via XAMPP, port 8080
    const response = await fetch("http://localhost:8080/api/trivia.php");
    const data = await response.json();

    document.getElementById("question").textContent = data.question;

    const btn = document.getElementById("btn");
    btn.style.display = "block";

    const answer = document.getElementById("answer");
    answer.style.display = "none";
    answer.textContent = "";

    currentAnswer = data.answer;
  } catch (err) {
    document.getElementById("question").textContent = "Could not load a question.";
    document.getElementById("btn").style.display = "none";
    document.getElementById("answer").style.display = "none";
    console.error(err);
  }
}

function showAnswer() {
  const answer = document.getElementById("answer");
  answer.textContent = currentAnswer;
  answer.style.display = "block";
}