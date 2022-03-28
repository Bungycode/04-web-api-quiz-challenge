// Create global javaScript selectors.
var quiz0Ele = document.querySelector("#quiz0");
var quiz0BtnEle = quiz0Ele.querySelector("button");
var quiz1Ele = document.querySelector("#quiz1");
var quiz1BtnEle = quiz1Ele.querySelector("button");
var quiz2Ele = document.querySelector("#quiz2");
var quiz2ButtonEle = quiz2Ele.querySelector("button");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#potentialAnswers");;
var timerEl = document.querySelector("#countDown");
var initialEl = document.querySelector("#inptInit");
var topScoresEl = document.querySelector("#topScoresEl");
var messageEl = document.querySelector("#message");
var finalScoreEl = document.querySelector("#finalScore");
var topScores = document.querySelector("#topScoresMsg");
var topScoresButtonEle = document.querySelector("#topScoresBtn");
var timeLeft;
//var timeInterval;


// Set a global variable to hide content.
var HIDE_CLASS = "hide" // Declare a variable and assign it the value of the CSS class .hide ...  .hide contains the property and value - display: none; to hide elements from showing on the screen.

//var storedHighScores =[];

// var storedHighScores =[];

// //   const quizGameObj ={
// //     initials: "",
// //     score: 0
// // }


// function quizGameObj(initials, score)  {
//     this.initials = initials;
//     this.score = score;
// }

// An array containing objects with keys that hold the questions, answers, and correct answer with its corresponding values.
var questions = [
    {question: "Which of these is the logical OR operator?",
    answers: ["&&", "||", "??", "?:"],
    answer: 1
    },
    {question: "Which of these is a ternary operator?",
    answers: ["?:", ":?", "!?", "?;"],
    answer: 0
    },
    {question: "This data type is used to represent text. They are written by enclosing their content in quotes.",
    answers: ["object", "number", "array", "string"],
    answer: 3
    },
    {question: "Which of these is not a special number?",
    answers: ["NaN", "Infinity", "-NaN", "-Infinity"],
    answer: 2
    },
    {question: "Which of these operators is used to concatenate?",
    answers: ["-", "?", "+", "/"],
    answer: 2
    },
    {question: "This data type distinguishes between two possibilities. Who am I?",
    answers: ["number", "boolean", "string", "binary"],
    answer: 1
    },
    {question: "which of these is a unary operator?",
    answers: ["typeof", "<", ">=", "!="],
    answer: 0
    },
    {question: "Which of these represent an undefined value?",
    answers: ["defined", "void", "false", "null"],
    answer: 3
    },
    {question: "Which of these is the logical and operator?",
    answers: ["&&", "||", "??", "?:"],
    answer: 0
    },
    {question: "Which of these is known as the modulo operator?",
    answers: ["/", "%", "*", "@"],
    answer: 1
    }
];

// Declared a function to organize all of my event listeners into one place. The function is called through the function init when the program loads before user input. In doing so, the event listeners will be waiting for the user to activate them.
function setEventListeners() { // 
    quiz0BtnEle.addEventListener("click", function () { // When quiz0BtnEle is clicked it will call a self-calling function containing the function setState with the argument "trivia"
        setState("trivia"); // The "trivia" argument will be passed through the parameter of the switch statement. This expression will be matched by the expression attached with the different case clauses. The case that matches the sent in expression will then execute the code contained inside that case and any cases that follow(regardless if it matches) unless prevented from doing so by a break statement.
    });
    quiz1BtnEle.addEventListener("click", function () { // When quiz1BtnEle is clicked it will call a self-calling function containing the function setState with the argument "scores"
        setState("myScore"); // The "scores" argument will be passed through the parameter of the switch statement. This expression will be matched by the expression attached with the different case clauses. The case that matches the sent in expression will then execute the code contained inside that case and any cases that follow(regardless if it matches) unless prevented from doing so by a break statement.
    });
    quiz2ButtonEle.addEventListener("click", function () { // When quiz2BtnEle is clicked it will call a self-calling function containing the function setState with the argument "start"
        setState("start"); // The "scores" argument will be passed through the parameter of the switch statement. This expression will be matched by the expression attached with the different case clauses. The case that matches the sent in expression will then execute the code contained inside that case and any cases that follow(regardless if it matches) unless prevented from doing so by a break statement.
    });
    topScoresButtonEle.addEventListener("click", function () {
        setState("topScores");
    })
    answersEl.addEventListener("click", function (evt) { // When the answersEl. variable is clicked (answersEl. contains the list items that are appended to the Ul underneathe the questions of the quiz), the event listener will call a self-calling function to pass in the value of the answers property in the questions object as an argument in place of the evt parameter to execute the following code in the code block.
        var target = evt.target;   // Declares a variable named target that is assigned the target property of the passed in argument. The target is the root element that raised the event.
        if (target.matches("li")) { // The matches() property is used on the variable target to see if it matches "li"...
            populateQuestion() // ... if so then a window alert will appear in the browser printing the innerText of the target variable.
        }
    })
}

// My current question count
var currentQuestion = 0;

function init() { // Declared a function named init which means initialization of the program.
    setEventListeners(); // Calling this function declares the eventListeners for the program.
    //populateHighScores ();
}

function storeGameData() { // Store the game data in localStorage
    localStorage.setItem("storedHighScores", JSON.stringify(storedHighScores));

}

function startGame() { // Declared startGame function, resets the current question, also creates the new game object.
    // currentGame = new quizObj("", 0); // Declare a variable and assign it the value of a constructor function creating a new object and set the values for an existing object's properties. This constructor function also needs the keyword new.
    populateQuestion(); // Calls the populateQuestion() function to implement the question and answers choices.
    countDown(); // Calls the countdown() function to initiate the countdown for the quiz.
}

function evalAnswer(answerChosen) {
    console.log("answer chosen: " + answerChosen);
    console.log(questions[currentQuestion]["answer"]);
    if(answerChosen === questions[currentQuestion]["answer"]) {
        correctAnswer(true);
    } else {
        correctAnswer(false);
    }
}

function correctAnswer(correct) {
    if (correct) {
        timeLeft = timeLeft + 5;
        console.log("Current score: " + thisGame["score"] + ", Current time: " + timeLeft);
        showInfo("correctAnswer");
    } else {
        showInfo("wrongAnswer");
        timeLeft = timeLeft - 10;
        console.log("Current score: " + thisGame["score"] + ", Current score: " + timeLeft);
    }
}

function showInfo(info) {
    switch (info) {
        case "correctAnswer": 
            messageEl.textContent = "You answered correctly!"
            break;
        
        case "wrongAnswer":
            messageEl.textContent = "Sorry...wrong answer!"
            break;

        case "topScores":
            topScoresMsg.classList.add("HIDE_CLASS");
            break;
        
        case "neverPlayed":
            topScoresMsg.textContent = "Are you going to be our first challenger???"
            topScoresMsg.classList.remove("HIDE_CLASS");
            break;

    }
}


var dynamicElements = [ // declares a variable and assigns it the value of an array containing variables as its elements. Currently Indexed 0-3.
    quiz0Ele,
    quiz1Ele,
    quiz2Ele,
    topScoresButtonEle
];

function setState(state) { // Declared a function called setState with the parameter of state. When this function is called, it will pass in its argument through the parameter in this function. The switch statement will take in that argument and match it with the expression in each case clause. If the argument matches a case clause, it will then execute the code contained inside of that case clause. It will continue down the list, executing the subsequent case clauses and default unless a break statement ends that particular flow path.

    switch (state) { // The switch statement when called, will pass in the argument in place of the parameter. 
        case "trivia": // If the value of the argument matches the value of this case it will execute the code contained inside.
            startGame();
            break; // The break statement ends this switch statement and proceeds with the rest of the code.

        case "myScore": // If the value of the argument matches the value of this case it will execute the code contained inside.
            break;// The break statement ends this switch statement and proceeds with the rest of the code.

        case "start":// If the value of the argument matches the value of this case it will execute the code contained inside.
            break;// The break statement ends this switch statement and proceeds with the rest of the code.
        default: // The point of the default statement is to provide code that will be executed if the argument that is passed in does not match any of the cases.
            break; // The break statement ends this switch statement and proceeds with the rest of the code.
    }
    

    dynamicElements.forEach(function (ele) { // Target the array dynamicElements and implement the .forEach method using a self-calling function to cycle through each of its current elements and use it as the argument placed in the parameter and execute the following code inside the code block.
        var possibleStatesAttr = ele.getAttribute("data-states"); // Declare a variable and assign the attribute "data-states" to the argument passed in through the .getAttribute() method.
        var possibleStates = JSON.parse(possibleStatesAttr); // Declare a variable and assign to it the value of turning the values inside the variable possibleStatesAttr into a number using the JSON.parse method.
        if (possibleStates.includes(state)) { // If the variable possibleStates includes the argument that was passed into the sibling switch statement then...
            ele.classList.remove(HIDE_CLASS); // ...then the current value passed as an argument in place of the parameter ele will use the remove() method to remove the value of the variable HIDE_CLASS using the .classList property. This will result in displaying the content.
        } else { // If none of the above conditions apply then the following code will use the add() method to add the value of the variable HIDE_CLASS resulting in hiding the content through display: none.  
            ele.classList.add(HIDE_CLASS);
        }
    });     
}

function populateQuestion() {
    var questionObj = questions[currentQuestion]; // Declare a variable and assign it the value of the index in the questions array.
    answersEl.innerHTML = ""; // Physically removes the current list items.
    questionEl.textContent = questionObj.question; // Target the text content of the h2 element and assign it the value of the question property in the questionObj variable. Remember that the questionObj value is the questions variable with the index value of currentQuestion.
    questionObj.answers.forEach(function (answers) { // Target the answers property in the variable questionObj, apply the .forEach method which contains a self-calling function using the property iself as the argument passed into the function through the parameter, and cycle through each current value of the property executing the following code within the code block.
        var li = document.createElement("li");// Declare a variable and assign it the value of a created li element on the document.
        li.textContent = answers; // assign the li's text content to the value of the answers property.
        answersEl.appendChild(li); // and then append it to the location where the id="potentialAnswers" is located. In this case, the unordered list.
    });
        if (currentQuestion === questions.length - 1) { // If currentQuestion is strictly equal to questions.length - 1 in regards to data type and data value...            
            currentQuestion = 0; // ...assign currentQuestion the value of 0.
        } else { // if not then increment currentQuestion by 1. 
            currentQuestion++;
    }
}

function countDown() {
    var timeLeft = 30;

    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds remaining";
            timeLeft--;

        } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + " second remaining";
        timeLeft--;
        } else {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        //displayMessage();
        timerEl.textContent = timeLeft + " seconds left! Times up!"
        setState(2)
        }
    }, 1000);
}



init(); // Calls the function init() which contains the function holding the eventListeners.