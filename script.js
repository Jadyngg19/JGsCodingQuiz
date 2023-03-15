// Set variables for the quiz
var currentQuestion = 0;
var score = 0;
var timeLeft = 75;
var timerInterval;
var quizContainer = document.querySelector(".quizContainer");
var questionContainer = document.getElementById("question");
var choicesContainer = document.getElementById("choiceList");
var messageContainer = document.getElementById("quizMessage");
var resultContainer = document.getElementById("result");

// Set questions for the quiz
var questions = [
{
question: "What does HTML stand for?",
choices: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "None of the above"],
correctAnswer: 2
},
{
question: "What does CSS stand for?",
choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "None of the above"],
correctAnswer: 0
},
{
question: "What is the correct syntax for creating a function in JavaScript?",
choices: ["function = myFunction()", "function:myFunction()", "function myFunction()", "None of the above"],
correctAnswer: 2
},
{
question: "What symbol is used to access jQuery?",
choices: ["%", "#", "$", "&"],
correctAnswer: 2
},
{
question: "What is the correct syntax for commenting in JavaScript?",
choices: ["<!--This is a comment-->", "//This is a comment", "/This is a comment/", "None of the above"],
correctAnswer: 1
}
];

// Function to begin the quiz
function beginQuiz() {
document.getElementById("welcome").style.display = "none";
document.getElementById("theTime").style.display = "block";
showQuestion();
startTimer();
}

// Function to show the current question
function showQuestion() {
questionContainer.innerHTML = questions[currentQuestion].question;
choicesContainer.innerHTML = "";
for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
var choice = questions[currentQuestion].choices[i];
var li = document.createElement("li");
li.setAttribute("class", "choice");
li.setAttribute("data-index", i);
li.innerHTML = choice;
li.addEventListener("click", checkAnswer);
choicesContainer.appendChild(li);
}
}

// Function to check the selected answer
function checkAnswer(event) {
var selectedChoice = event.target;
var selectedIndex = selectedChoice.getAttribute("data-index");
if (selectedIndex == questions[currentQuestion].correctAnswer) {
score++;
messageContainer.innerHTML = "Correct!";
} else {
timeLeft -= 10;
messageContainer.innerHTML = "Incorrect.";
}
if (currentQuestion == questions.length - 1) {
showResult();
} else {
currentQuestion++;
showQuestion();
}
}

// Function to show the quiz result
function showResult() {
clearInterval(timerInterval);
quizContainer.style.display = "none";
resultContainer.style.display = "block";
var resultText = "You scored " + score + " out of " + questions.length + " questions!";
resultContainer.innerHTML = resultText;
}

// Function to start the timer
function startTimer() {
timerInterval = setInterval(function() {
timeLeft--;
document.getElementById("timer").innerHTML = timeLeft;
if (timeLeft <= 0) {
clearInterval(timerInterval);
showResult();
}
}, 1000);
}

// Event listener for the next question button
document.getElementById("nextButton").addEventListener("click", function() {
currentQuestion++;
showQuestion();
});