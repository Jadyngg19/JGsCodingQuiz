// Quiz questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin"],
        correctAnswer: 0
    },
    {
        question: "What is the highest mountain in the world?",
        choices: ["K2", "Mount Everest", "Makalu"],
        correctAnswer: 1
    },
    {
        question: "What is the currency of Japan?",
        choices: ["Yen", "Dollar", "Euro"],
        correctAnswer: 0
    },
    {
        question: "What is the largest country in the world?",
        choices: ["China", "Russia", "United States"],
        correctAnswer: 1
    },
    {
        question: "What is the capital of Brazil?",
        choices: ["Rio de Janeiro", "Brasilia", "Sao Paulo"],
        correctAnswer: 1
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
const quizContainer = document.querySelector(".quizContainer");
const questionEl = document.getElementById("question");
const choiceListEl = document.getElementById("choiceList");
const messageEl = document.getElementById("quizMessage");
const resultEl = document.getElementById("result");
const startButtonEl = document.getElementById("startButton");
const nextButtonEl = document.getElementById("nextButton");

// Timer function
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Begin quiz function
function beginQuiz() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("theTime").style.display = "block";
    startButtonEl.style.display = "none";
    nextButtonEl.style.display = "none";
    showQuestion();
    startTimer();
}

// Show question function
function showQuestion() {
    questionEl.innerHTML = questions[currentQuestion].question;
    choiceListEl.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        const choice = questions[currentQuestion].choices[i];
        const li = document.createElement("li");
        li.innerHTML = `<button onclick='checkAnswer(${i})'>${choice}</button>`;
        choiceListEl.appendChild(li);
    }
}

// Check answer function
function checkAnswer(answer) {
    if (answer === questions[currentQuestion].correctAnswer) {
        score++;
        messageEl.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        messageEl.textContent = "Wrong! -10 seconds";
    }
    messageEl.style.display = "block";
    nextButtonEl.style.display = "block";
    startButtonEl.style.display = "none";
}

// Next question function
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion === questions.length) {
        endQuiz();
    } else {
        showQuestion();
        messageEl.style.display = "none";
        nextButtonEl.style.display = "none";
        startButtonEl.style.display = "block";
    }
}

// End quiz function
function endQuiz() {
    clearInterval(timer);
    quizContainer.innerHTML = `
        <h2>Quiz Complete</h2>
        <p>Your score is ${score}.</p>
        <button onclick="showLeaderboard()">Show Leaderboard</button>
    `;
}

// Leaderboard function
function showLeaderboard() {
    const highScores = localStorage.getItem("highScores")
      ? JSON.parse(localStorage.getItem("highScores"))
      : [];
  
    highScores.push(score);
  
    highScores.sort((a, b) => b - a);
  
    while (highScores.length > 5) {
      highScores.pop();
    }
  
    const initials = prompt("Enter your initials:");
  
    const entry = {
      initials,
      score
    };
  
    highScores.push(entry);
  
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    const leaderboardHTML = `
      <h2>High Scores</h2>
      <ol>
        ${highScores
          .map(
            (entry) =>
              `<li>${entry.initials}: ${entry.score}</li>`
          )
          .join("")}
      </ol>
      <button onclick="location.reload()">Try Again</button>
    `;
  
    quizContainer.innerHTML = leaderboardHTML;
  }
  
  

// Initialize quiz
questionEl.innerHTML = "Press the start button to begin the quiz.";
messageEl.style.display = "none";
resultEl.style.display = "none";
nextButtonEl.style.display = "none";
startButtonEl.addEventListener("click", beginQuiz);
nextButtonEl.addEventListener("click", nextQuestion);        