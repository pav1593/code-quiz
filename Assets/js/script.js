
// assign variables

let startBtn = document.querySelector('#startBtn');
let highscoreDisplay = document.querySelector('.highscore');
let timerDisplay = document.querySelector('.timer');
let questionDisplay = document.querySelector('.question-card');
let questionTitle = document.querySelector('.question-title');
let questionContent= document.querySelector('.question-container');
let questionMsg= document.querySelector('.question-msg');
let answersList = document.querySelector('#answers');

let time=5; // time default to 60 seconds
let quizDone = false;
let question = 0;
var answers = [];
var currentScore = 0;

// set up questions and answers

var questions = [
    { id: 0, question: "Do you own a home?", answers: ["Yes", "No","sdfsdf", "sdfsdfs"], correct: 0},
    { id: 1, question: "Do you live alone?", answers: ["Yes", "No"], correct: 1}
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
        
            
            for (var i = 0; i < answerCount; i++) {
                let answer = questions[question].answers[i];
                let correctAnswer = questions[question].answers[i];
            
                var li = document.createElement("li");
                li.setAttribute("data-index", i+1);
            
                var button = document.createElement("button");
                button.setAttribute("class","button");
                button.textContent = i+1 + ". "+answer;
            
                li.appendChild(button);
                answersList.appendChild(li);   
            }
}

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

function quizOver() {
    questionTitle.textContent="All done!";
    answersList.innerHTML = "";
    questionDisplay.setAttribute("style","border:none;");
    questionMsg.textContent="";

    questionContent.textContent='Your final score is '+currentScore+' out of '+questions.length;
}

startBtn.addEventListener('click',function(event) {
    event.preventDefault();
    renderQuestions();
    startTimer();
});

answersList.addEventListener("click", function(event) {
    var element = event.target;

    event.preventDefault();
 
    if (quizDone) {
        return;
    }

    if (element.matches("button") === true) {
        answers[question] = element.parentElement.getAttribute("data-index")-1;


        if (answers[question]===(questions[question].correct)) {
            questionDisplay.setAttribute("style","margin-bottom: 10px; border-bottom: 3px solid gray;");
            questionMsg.textContent='Correct!';
            currentScore++;
        } else {
            questionDisplay.setAttribute("style","margin-bottom: 10px; border-bottom: 3px solid gray;");
            questionMsg.textContent='Wrong!';
        }
            
        
        question++;
        renderQuestions();
    }

  });
  

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    
  
    let user = {
        initials: initialsInput.value,
        score: currentScore
    };
  
    
    localStorage.setItem("user",JSON.stringify(user));
  
  });


function main() {
    startBtn.focus();
}

main();