
// initialize variables

let startBtn = document.querySelector('#startBtn');
let highscoreDisplay = document.querySelector('.highscore');
let timerDisplay = document.querySelector('.timer');
let questionDisplay = document.querySelector('.question-card');
let questionTitle = document.querySelector('.question-title');
let questionContent= document.querySelector('.question-container');
let questionMsg= document.querySelector('.question-msg');
let answersList = document.querySelector('#answers');
let line=document.querySelector('#line');

let time=60; // time default to 60 seconds
let quizDone = false;
let question = 0; //keep count of current question number
var answers = []; //store user answers
var currentScore = 0; //keeps current quiz score

// set up questions and answers in an array

var questions = [
    { id: 0, question: "Commonly used data types DO NOT include:", answers: ["strings", "booleans","alerts", "numbers"], correct: 2},
    { id: 1, question: "The condition in an if/else statement is enclosed within ______.", answers: ["quotes", "curly brackets","parentheses","square brackets"], correct: 2},
    { id: 2, question: "Arrays in JavaScript can be used to store ______.", answers: ["numbers and strings", "other arrays","booleans","all of the above"], correct: 3},
    { id: 1, question: "String values must be enclosed within ______ when being assigned to variables.", answers: ["commas", "curly brackets","quotes","parentheses"], correct: 2},
    { id: 1, question: "A very useful tool used during development and debugging for printing content to the debugger is:", answers: ["JavaScript", "terminal/bash","for loops","console.log"], correct: 3}
];


function renderQuestions() {
    // clear the question container

    if (question===questions.length) {
        return;
    }

    questionTitle.textContent="";
    questionTitle.setAttribute('style',"text-align:left");
    questionContent.textContent='';
    questionContent.setAttribute('style',"text-align:left");
    answersList.innerHTML = "";
    questionDisplay.setAttribute("style","border:none;");
    questionMsg.textContent="";

        
    // display current question 
    
    let answerCount = questions[question].answers.length;
    questionTitle.textContent=questions[question].question;

    // create and display the list of multiple choice answers attached to eaach question
    for (var i = 0; i < answerCount; i++) {
        let answer = questions[question].answers[i];
    
        var li = document.createElement("li");
        li.setAttribute("data-index", i+1);
    
        var button = document.createElement("button");
        button.setAttribute("class","button");
        button.textContent = i+1 + ". "+answer;
    
        li.appendChild(button);
        answersList.appendChild(li);   
    }
}

// start the timer and quit once time reaches ZERO
function startTimer() {
    
    timerDisplay.textContent=time;
    
    let timer = setInterval(function (){
        time--;
        timerDisplay.textContent=time;
        
        if (!time) {
            clearInterval(timer);
            quizDone=true;
            quizOver();
            return;
        }

    },1000);
}

// quiz over screen that presents the final score and offers user to input their initials
function quizOver() {
    questionTitle.textContent="All done!";
    answersList.innerHTML = "";
    questionDisplay.setAttribute("style","border:none;");
    questionMsg.textContent="";

    questionContent.textContent='Your final score is '+currentScore+' out of '+questions.length;
}

// start button listener that launches the renderQuestions and startTimer functions
startBtn.addEventListener('click',function(event) {

    renderQuestions();
    startTimer();
});

// multiple choice user choice listener that handles right or wrong questions
answersList.addEventListener("click", function(event) {
    var element = event.target;
 
    if (quizDone) {
        return;
    }

    if (element.matches("button") === true) {
        answers[question] = element.parentElement.getAttribute("data-index")-1;


        if (answers[question]===(questions[question].correct)) { 
            questionMsg.textContent='Correct!';
            currentScore++;
        } else { 
            questionMsg.textContent='Wrong!';
            if (time > 10){
                time = time - 10;
            } else {
                time=0;
                return;
            }
        }
            
        question++;
        renderQuestions();
    }

  });
  

// listener for the initials submit form
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    
  
    let user = {
        initials: initialsInput.value,
        score: currentScore
    };
  
    localStorage.setItem("user",JSON.stringify(user));
  
  });

// functtion sets focus to the Start button when the page is loaded
function main() {
    startBtn.focus();
}

main();