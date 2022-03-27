// Create global javaScript selectors.
var quiz0Ele = document.querySelector('#quiz0');
var quiz0BtnEle = quiz0Ele.querySelector('button');
var quiz1Ele = document.querySelector('#quiz1');
var quiz1BtnEle = quiz1Ele.querySelector('button');
var quiz2Ele = document.querySelector('#quiz2');
var quiz2ButtonEle = quiz2Ele.querySelector('button');
var questionEl = document.querySelector('#question');
var answersEl = document.querySelector('#potentialAnswers');
var doSomethingEle = document.querySelector('#doSomething');
var saySomethingEle = document.querySelector('#saySomething');

// Set a global variable to hide content.
var HIDE_CLASS = 'hide'

// An array containing objects with keys that hold the questions, answers, and correct answer with its corresponding values.
var questions = [
    {question: 'Which of these is the logical OR operator?',
    answers: ['&&', '||', '??', '?:'],
    answer: 1
    },
    {question: 'Which of these is a ternary operator?',
    answers: ['?:', ':?', '!?', '?;'],
    answer: 0
    },
    {question: 'This data type is used to represent text. They are written by enclosing their content in quotes.',
    answers: ['objects', 'numbers', 'arrays', 'strings'],
    answer: 3
    },
    {question: 'Which of these is not a special number?',
    answers: ['NaN', 'Infinity', '-NaN', '-Infinity'],
    answer: 2
    },
    {question: 'Which of these operators is used to concatenate?',
    answers: ['-', '?', '+', '/'],
    answer: 2
    },
    {question: 'This data type distinguishes between two possibilities. Who am I?',
    answers: ['number', 'boolean', 'string', 'binary'],
    answer: 1
    },
    {question: 'which of these is a unary operator?',
    answers: ['typeof', '<', '>=', '!='],
    answer: 0
    },
    {question: 'Which of these represent an undefined value?',
    answers: ['defined', 'void', 'false', 'null'],
    answer: 3
    },
    {question: 'Which of these is the logical and operator?',
    answers: ['&&', '||', '??', '?:'],
    answer: 0
    },
    {question: 'Which of these operators is known as the module operator?',
    answers: ['/', '%', '*', '@'],
    answer: 1
    }
];

// Organize all of my event listeners into one place.
function setEventListeners() {
    quiz0BtnEle.addEventListener('click', function () {
        setState(1);
    });
    quiz1BtnEle.addEventListener('click', function () {
        setState(2);
    });
    quiz2ButtonEle.addEventListener('click', function () {
        setState(0);
    });

    answersEl.addEventListener('click', function (evt) {
        // The target property returns the element that triggered the event.
        var target = evt.target;
        if (target.matches("li")) {
            window.alert(target.innerText);
        }
    })
}

// My current question count
var currentQuestion = 0;

function init() {
    setEventListeners();
}

var dynamicElements = [
    quiz0Ele,
    quiz1Ele,
    quiz2Ele,
    doSomethingEle,
    saySomethingEle
];

function setState(state) {
    switch (state) {
        case 1:
            populateQuestion();
            break;
        default:
            break;
    }

    dynamicElements.forEach(function (ele) {
        var possibleStatesAttr = ele.getAttribute("data-states");
        var possibleStates = JSON.parse(possibleStatesAttr);
        if (possibleStates.includes(state)) {
            ele.classList.remove(HIDE_CLASS);
        } else {
            ele.classList.add(HIDE_CLASS);
        }
    });     

}

function populateQuestion() {
    var questionObj = questions[currentQuestion];
    // Remove the current list items
    answersEl.innerHTML = "";
    questionEl.textContent = questionObj.question;
    questionObj.answers.forEach(function (question) {
        var li = document.createElement("li");
        li.textContent = question;
        answersEl.appendChild(li);
    });
    if (currentQuestion === questions.length - 1) {
        currentQuestion = 0;
    } else {
        currentQuestion++;
    }
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

    if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval); // we wanted to clear the loop because if this wasnt here I think the teacher said it will keep running the loop.
        // Calls function to create and append image
        sendMessage();
    }

    }, 1000); // This is the time that we wanted to run each unit of time. The 1000 is in milliseconds, so we wanted 1 second. When we call the function, our second argument that is passed in the place for the parameter will run the function at one second intervals.
}

init();