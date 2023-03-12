//document querySelectors
let timeLeft = document.querySelector("#time")
let startScreen = document.querySelector("#start-screen");
let startButton = document.querySelector("#start");
let questionsScreen = document.querySelector("#questions");
let questionTitle = document.querySelector("#question-title");
let choices = document.querySelector(".choices");
let endScreen = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
let initials = document.querySelector("#initials");
let submitButton = document.querySelector("#submit");
let feedback = document.querySelector(".feedback");

//relative paths to audio files
let correctAudio = new Audio("./assets/sfx/correct.wav");
let wrongAudio = new Audio("./assets/sfx/incorrect.wav");


//Variables to check when the quiz runs out of questions
let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
let isCorrect = false;      // Default: Un answered question is marked wrong 
 
//variables to calculate the score
finalScore.textContent = 0;
let score = parseInt(finalScore.textContent);
// console.log(score);

//array to score each user
let scoresArray = [];

//retrieve previous stores from local storage
function init() {
    const storedScoresArray = JSON.parse(localStorage.getItem("scoresArray"));
    if (storedScoresArray !== null) {
        scoresArray = storedScoresArray;
    }
}

//hide an element
function hideSection(element) {
    element.classList.remove("start");
    element.classList.add("hide")
}

//show an element
function openSection(element) {
    element.classList.remove("hide");
    element.classList.add("start")
}

//if the answer is correct, add 5 points to the score, play the 'correct' sound and move to the next question
function checkAnswer(answer) {
   if (questions[runningQuestionIndex].correct === answer) {
        console.log("Choice: " + answer);
        console.log("Correct Answer: " + questions[runningQuestionIndex].correct);
        isCorrect = true;
        feedback.textContent = "Correct!";
        console.log(feedback.textContent);
        correctAudio.play();
        score += 5;
        console.log("Score: " + score);
        runningQuestionIndex++
        renderQuestions();
//if the answer is incorrect, reduce the time by 10 seconds and play the 'incorrect' sound, but stay on the same question
    } else {
        console.log("Choice: " + answer);
        console.log("Correct Answer: " + questions[runningQuestionIndex].correct);
        isCorrect = false;
        feedback.textContent = "Wrong!";
        console.log(feedback.textContent);
        wrongAudio.play();
        timerCount -= 10;
    } 
}

//create four list items for the answer choices and append to the div with the class of choices
let choiceA = document.createElement("button");
choiceA.addEventListener("click", function(event) {
    checkAnswer("A")
});
choiceA.id = "A";

let choiceB = document.createElement("button");
choiceB.addEventListener("click", function(event) {
    checkAnswer("B")
});
choiceB.id = "B";

let choiceC = document.createElement("button");
choiceC.addEventListener("click", function(event) {
    checkAnswer("C")
});
choiceC.id = "C";

let choiceD = document.createElement("button");
choiceD.addEventListener("click", function(event) {
    checkAnswer("D")
 });
choiceD.id = "D";

choices.appendChild(choiceA);
choices.appendChild(choiceB);
choices.appendChild(choiceC);
choices.appendChild(choiceD);

//display a question on screen until there are no more questions left
function renderQuestions() {
    if (runningQuestionIndex > lastQuestionIndex) {
        return;
    } else {
    let currentQuestion = questions[runningQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choiceA.textContent = currentQuestion.choiceA;
    choiceB.textContent = currentQuestion.choiceB;
    choiceC.textContent = currentQuestion.choiceC;
    choiceD.textContent = currentQuestion.choiceD;
    }
}

//keep the feedback section open until there are no more questions
function renderFeedback() {
    for (let runningQuestionIndex = 0; runningQuestionIndex <= lastQuestionIndex; runningQuestionIndex++) {
        openSection(feedback);
    }
}

//display the final score at the end screen
function renderScore() {
    finalScore.textContent = score;
    timeLeft.textContent = 0;
    console.log("Final Score: " + score);
}

//start the timer and clear it if the counter gets to zero or there are no more questions
function startTimer() { 
    timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;
        if (timerCount >= 0) {
        }
        if (timerCount <= 0 || runningQuestionIndex > lastQuestionIndex) {
            clearInterval(timer);
            hideSection(questionsScreen);
            hideSection(feedback);
            openSection(endScreen);
            renderScore();
        }
    }, 1000); 
}

//function to start the quiz
function startQuiz () {
    timerCount = 60; 
    hideSection(startScreen);
    renderQuestions();
    openSection(questionsScreen);
    openSection(feedback);
    startTimer();
}

//Event listener on Start Quiz button to start the quiz
startButton.addEventListener("click", startQuiz);

//store all scores and corresponding initials in the local storage
 function storeScoresArray () {
    localStorage.setItem("scoresArray", JSON.stringify(scoresArray))
 }

// add user initials to their score in the scores array and update the local storage
//if the user doesn't enter initials, nothing is stored
submitButton.addEventListener("click", function(event) {
    if (initials.value === "") {
        return;
    } 
    let scoreSubmission = [initials.value, score];
    console.log(scoreSubmission);
    scoresArray.push(scoreSubmission);
    storeScoresArray();
});

init();