

$(document).ready(function() {
    console.log("js linked up");

    var questionArray = [
        {
            questionText: "Which movie does Han Solo get frozen in?",
            answerArray: ["Empire Strikes Back","The Force Awakens","Return of the Jedi","Phantom Menace"],
            correctAnswer: "Empire Strikes Back"
        },
        {
            questionText: "How many people are on the Jedi Council?",
            answerArray: ["12","6","27","3"],
            correctAnswer: "12"
        },
        {
            questionText: "Who does Han Solo win the Millenium Falcon from?",
            answerArray: ["Jabba the Hut","Emperor Palpatine","Lando Calrissian","Obi Wan Kenobi"],
            correctAnswer: "Lando Calrissian"
        },
        {
            questionText: "Who is R2D2's sidekick?",
            answerArray: ["Chewbacca","C3PO","Rey","BB8"],
            correctAnswer: "C3PO"
        },
        {
            questionText: "Who is Han Solo's killer?",
            answerArray: ["Emperor Palpatine","Boba Fett","Darth Vader","Kylo Ren"],
            correctAnswer: "Kylo Ren"
        },
        {
            questionText: "Where do the Ewok's live?",
            answerArray: ["Endor","Dagobah","Naboo","Tatooine"],
            correctAnswer: "Endor"
        },
        {
            questionText: "Who is Leia's adoptive father?",
            answerArray: ["Obi Wan Kenobi","Kwai Gon Jin","Bail Organa","Anakin Skywalker"],
            correctAnswer: "Bail Organa"
        },
        {
            questionText: "What is an alias of Chancellor Palpatine?",
            answerArray: ["Darth Vader","Darth Sidious","Darth Maul","Count Dooku"],
            correctAnswer: "Darth Sidious"
        }
        ];



    var activeQuestion = 0;
    var timerSeconds;
    var tickTock;
    var answersCorrect = 0;
    var answersIncorrect = 0;
    var answersUnanswered = 0;
    var gameIsDone = false;



    hideAllPages();


    // start button clicked
    $("#startButton").on("click", function() {
        hideStartButton();
        showQuestionPage();
        tickTock = setInterval(timerCountdown, 1000 * 1);
        resetTimer();
        printQandA();
    });

    function resetTimer() {
        timerSeconds = 10;
        $("#htmlTimer").text(timerSeconds);
    };

    $("#playAgainButton").on("click",function() {
        activeQuestion = 0;
        answersCorrect = 0;
        answersIncorrect = 0;
        answersUnanswered = 0;
        gameIsDone = false;
        tickTock = setInterval(timerCountdown, 1000 * 1);
        resetTimer();
        printQandA();

        hideCompletePage();
        showQuestionPage();

    })
    
    
    // Prints question and answers
    function printQandA() {
        $("#htmlQuestion").text("");
        $("#htmlQuestion").text(questionArray[activeQuestion].questionText);
        
        $("#htmlAnswers").html("");
        for (var n=0; n < questionArray[activeQuestion].answerArray.length; n++) {
            var nAnswer = questionArray[activeQuestion].answerArray[n]
            var $answerDisplay = $("<button>");
            $answerDisplay.addClass("clickableAnswer");
            $answerDisplay.addClass("button");
            $answerDisplay.addClass("center");
            $answerDisplay.attr("data-value",nAnswer);
            $answerDisplay.html(nAnswer);
            $("#htmlAnswers").append($answerDisplay);
            $("#htmlAnswers").append("<br>");
        }
    };

    $(document).on("click", ".clickableAnswer", function() {
        var userAnswer = $(this).attr("data-value");
        var correctAnswer = questionArray[activeQuestion].correctAnswer;
        console.log("userAnswer: " + userAnswer);
        console.log("correctAnswer: " + correctAnswer);
        

        // checks if the answer is correct
        if (userAnswer === correctAnswer) {
            $("#htmlResult").text("Nice! You got it right!");
            answersCorrect++;
        } else {
            $("#htmlResult").text("Wrong! The correct answer was: " + questionArray[activeQuestion].correctAnswer);
            answersIncorrect++;
        }
        hideQuestionPage();
        showResultPage();

        setTimeout(function() {
            showQuestionPage();
            hideResultPage();
            resetTimer();
        },1000*3);

        

        resetTimer();
        activeQuestion++;
        checkIfDone();

        if (gameIsDone !== true) {
            printQandA();
        }

    });



    function checkIfDone() {
        if (activeQuestion === questionArray.length) {
            gameIsDone = true;
            clearInterval(tickTock);

            setTimeout(showCompletePage,1000*3);
        }
    };


    // Counts down the timer and displays to the page. Also checks if timer is at/below zero.
    function timerCountdown() {
        timerSeconds--;
        $("#htmlTimer").text(timerSeconds);

        // move to next question if timer is zero
        if (timerSeconds <= 0) {
            answersUnanswered++;
            $("#htmlResult").text("Out of time! The correct answer was: " + questionArray[activeQuestion].correctAnswer);

            hideQuestionPage();
            showResultPage();

            setTimeout(function() {
                showQuestionPage();
                hideResultPage();
                resetTimer();
            },1000*3);
            
            activeQuestion++;
            console.log(activeQuestion);
            answersIncorrect++;
            resetTimer();
            checkIfDone();
        }
        if (gameIsDone !== true) {
            printQandA();
        }
    };

    
    

    function hideStartButton() {
        $("#startButton").css("display","none");
    };

    function hideAllPages() {
        $("#questionPage").css("display","none");
        $("#resultPage").css("display","none");
        $("#completePage").css("display","none");
    };

    function showAllPages() {
        $("#questionPage").css("display","");
        $("#resultPage").css("display","");
        $("#completePage").css("display","");
    }

    function showQuestionPage() {
        $("#questionPage").css("display","");
    };

    function hideQuestionPage() {
        $("#questionPage").css("display","none");
    };

    function showResultPage() {
        $("#resultPage").css("display","");
    };

    function hideResultPage() {
        $("#resultPage").css("display","none");
    };

    function showCompletePage() {
        hideQuestionPage();
        hideResultPage();
        $("#htmlAnswersCorrect").text("Correct Answers: " + answersCorrect);
        $("#htmlAnswersIncorrect").text("Incorrect Answers: "+ answersIncorrect);
        $("#htmlAnswersUnanswered").text("Unanswered: " + answersUnanswered);
        $("#completePage").css("display","");
    };

    function hideCompletePage() {
        $("#completePage").css("display","none");
    };

    
    


}); // close Doc.ready





