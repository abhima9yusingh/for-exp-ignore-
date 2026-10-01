const questionNumbers = document.getElementById("question-number");
const questions = [
    {
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Text Market Language", "High Text Market Language"],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 1
    },
    {
        question: "Which language makes web pages interactive?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerElements = document.querySelectorAll("#answers button");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");

function showQuestion() {
    questionNumbers.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    if (currentQuestion >= questions.length) {
        return;
    }

    const current = questions[currentQuestion];
    questionElement.textContent = current.question;

    answerElements.forEach((button, index) => {
        button.textContent = current.answers[index];
        button.classList.remove("correct", "wrong");
        button.disabled = false;
        button.style.display = "block";
        button.onclick = () => checkAnswer(index);
    });

    nextButton.disabled = true;
    nextButton.textContent = "Next";
    nextButton.style.display = "inline-block";
}

function checkAnswer(selectedAnswer) {
    const current = questions[currentQuestion];
    const correctAnswer = current.correct;
    const buttons = Array.from(answerElements);

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctAnswer) {
            button.classList.add("correct");
        }

        if (index === selectedAnswer && index !== correctAnswer) {
            button.classList.add("wrong");
        }
    });

    scoreElement.textContent = "Score: " + score;
    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionElement.textContent = "Quiz finished!";
        answerElements.innerHTML = "";
        nextButton.style.display = "none";
        scoreElement.textContent = "Final Score: " + score + " out of " + questions.length;
        restartButton.style.display = "inline-block";
    }
});

const scrollStage = document.querySelector(".scroll-zoom-section");
const zoomContent = document.querySelector(".zoom-content");

if (scrollStage && zoomContent) {
    const updateZoomEffect = () => {
        const rect = scrollStage.getBoundingClientRect();
        const total = scrollStage.offsetHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;

        const zoom = 1 + progress * 1.8;
        zoomContent.style.transform = `scale(${zoom})`;
        zoomContent.style.opacity = `${1 - progress * 0.75}`;
        zoomContent.style.filter = `blur(${progress * 1.2}px)`;
    };

    window.addEventListener("scroll", updateZoomEffect, { passive: true });
    window.addEventListener("resize", updateZoomEffect);
    updateZoomEffect();
}

showQuestion();

restartButton.onclick = function() {

    currentQuestion = 0;
    score = 0;
    
    scoreElement.textContent = "Score: 0";

    nextButton.style.display = "inline-block";

    restartButton.style.display = "none";

    showQuestion();
}
