var i = "Connection";
console.log(i);

var timerLi = document.querySelector("#timerLi");
var startBtn = document.querySelector(".start-button");
var questionDiv = document.querySelector("#question");
var answerDivA = document.querySelector("#A");
var answerDivB = document.querySelector("#B");
var answerDivC = document.querySelector("#C");
var answerDivD = document.querySelector("#D");
var questionContainer = document.querySelector(".queSection");
var questionResult = document.querySelector("#questionResult");
var score = 0;
var endQuizEl = document.querySelector("#endQuiz");
var initialSubmitEl = document.querySelector("#initialSubmit");
let scoreListEl = document.querySelector("#scoreList");
let finalScoreEl = document.querySelector("#finalScore");
let retakeBtnEl = document.querySelector("#retakeBtn");

var timer;
var count;
var timerCount = 90;

var questionBank = [
  {
    question: "Commonly used data types DO NOT include:",
    answerA: "strings",
    answerB: "booleans",
    answerC: "alerts",
    answerD: "numbers",
    correct: "C",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ______",
    answerA: "quotes",
    answerB: "curly brackets",
    answerC: "parentheses",
    answerD: "square brackets",
    correct: "B",
  },
  {
    question: "Arrays in JavaScript can be used to store ______________.",
    answerA: "numbers and arrays",
    answerB: "other arrays",
    answerC: "booleans",
    answerD: "all answers are correct",
    correct: "D",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to a value.",
    answerA: "commas",
    answerB: "curly brackets",
    answerC: "quotes",
    answerD: "parentheses",
    correct: "C",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerA: "Javascript",
    answerB: "terminal / bash",
    answerC: "for loops",
    answerD: "console.log",
    correct: "D",
  },
];
var questionBankIndex = questionBank.length - 1;

var questionCounter = 0;
console.log(questionBankIndex);
startBtn.addEventListener("click", startGame);
function startGame() {
  questionCounter = 0;
  console.log("Game Started");
  startBtn.style.display = "none";
  questionContainer.style.display = "block";
  scoreListEl.style.display = "none";
  endQuizEl.style.display = "none";

  timerCount = 30;
  questionCounter = 0;
  startTimer();
}

function generateQuestions() {
  var q = questionBank[questionCounter];
  questionDiv.textContent = q.question;
  answerDivA.textContent = q.answerA;
  answerDivB.textContent = q.answerB;
  answerDivC.textContent = q.answerC;
  answerDivD.textContent = q.answerD;
}
generateQuestions();
function answerIsCorrect() {
  questionResult.textContent = "Correct";
}
function answerIsWrong() {
  questionResult.textContent = "Wrong";
}
function checkAnswer(answer) {
  if (questionBank[questionCounter].correct == answer) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
    timerCount = timerCount - 5;
  }
  if (questionCounter < questionBankIndex) {
    questionCounter++;
    generateQuestions();
  } else {
    endQuiz();
  }
}
function startTimer() {
  timer = setInterval(clockTick, 1000);
}
function clockTick() {
  timerCount--;
  timerLi.textContent = " Time Remaining: " + timerCount;
  if (timerCount <= 0) {
    endQuiz();
  }
}
function endQuiz() {
  clearInterval(timer);
  endQuizEl.style.display = "block";
  questionContainer.style.display = "none";
  finalScoreEl.textContent = score;
}
function saveHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  let initialsEl = document.querySelector("#initialTxt");
  let newScore = {
    score: score,
    initials: initialsEl.value.trim(),
  };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  scoreListEl.style.display = "block";
}
initialSubmitEl.onclick = saveHighScores;
retakeBtnEl.onclick = startGame;
