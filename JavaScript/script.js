// Quiz questions and answers
const questions = [
    {
        question: "What is JavaScript?",
        choices: ["A server-side language", "A client-side language", "A database language"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        choices: ["String", "Boolean", "Array"],
        correctAnswer: 2
    },
    {
        question: "What is the keyword used to declare a variable in JavaScript?",
        choices: ["var", "let", "const"],
        correctAnswer: 0
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        choices: ["It checks if two values are equal in value and data type.", "It checks if two values are equal in value but not necessarily in data type.", "It assigns a value to a variable."],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a loop in JavaScript?",
        choices: ["for loop", "while loop", "do-while loop"],
        correctAnswer: 2
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        choices: ["It refers to the current function being executed.", "It refers to the current object.", "It refers to the global object."],
        correctAnswer: 1
    },
    {
        question: "What is the purpose of the 'typeof' operator in JavaScript?",
        choices: ["It returns the data type of a value.", "It checks if a variable exists.", "It assigns a value to a variable."],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a way to declare a function in JavaScript?",
        choices: ["function declaration", "function expression", "function assignment"],
        correctAnswer: 2
    },
    {
        question: "What is the purpose of the 'NaN' value in JavaScript?",
        choices: ["It represents a value that is not a number.", "It represents a value that is undefined.", "It represents a value that is null."],
        correctAnswer: 0
    },
    {
        question: "What is the purpose of the 'try...catch' statement in JavaScript?",
        choices: ["It allows you to catch and handle errors that occur in your code", "It allows you to skip over errors that occur in your code.", "It allows you to run code multiple times."],
        correctAnswer: 0
    },
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
  
    const initials = prompt("Enter your initials:");
    
    const entry = {
      initials,
      score
    };
    
    highScores.push(entry);
  
    highScores.sort((a, b) => b.score - a.score);
  
    while (highScores.length > 5) {
      highScores.pop();
    }
  
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
      <button onclick="goHome()">Try Again</button>
      <button onclick="clearLeaderboard()">Clear Leaderboard</button>
    `;
  
    quizContainer.innerHTML = leaderboardHTML;
  } 

// Clear leaderboard 
function clearLeaderboard() {
    localStorage.clear();
    leaderboard.innerHTML = ""; 
    window.location.reload;
}  

// Function to take user back to homepage
function goHome() {
    window.location.href = "index.html";
} 

// Initialize quiz
questionEl.innerHTML = "Press the start button to begin the quiz.";
messageEl.style.display = "none";
resultEl.style.display = "none";
nextButtonEl.style.display = "none";
startButtonEl.addEventListener("click", beginQuiz);
nextButtonEl.addEventListener("click", nextQuestion); 