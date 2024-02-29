const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Jupiter', 'Venus', 'Saturn'],
    correctAnswer: 'Mars'
  },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let wrongQuestions = 0;
let timeRemaining = 7200; // in seconds, adjust as needed
let timerInterval;
let displayCorrect = questions.correctAnswer;

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  const submitButton = document.getElementById('submit-button');
  const timerElement = document.getElementById('timer');
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const scoreContainer = document.getElementById('score');
  const displayCorrect = document.getElementById('correct-answers')
    displayCorrect.style.display = 'none';
    submitButton.style.display = 'none';  
    

  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', submitQuiz);

  function startQuiz() {
    startButton.style.display = 'none';
    submitButton.style.display = 'block';
    displayCorrect.style.display = 'none';
    showQuestion();
    startTimer();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeRemaining--;
      const timeTakenHr= Math.trunc((timeRemaining)/6000);
      const timeTakenMin= Math.trunc((timeRemaining/60)-60);
      const timeTakenSec = ((timeRemaining)%60);

      timerElement.innerText = `Time Remaining: ${timeTakenHr}hr ${timeTakenMin}min ${timeTakenSec}sec`;



      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }

  function showQuestion() {
    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';

    questions[currentQuestionIndex].options.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkAnswer(index));
      optionsContainer.appendChild(optionElement);
    });
  }

  function checkAnswer(selectedIndex) {
    if (questions[currentQuestionIndex].options[selectedIndex] === questions[currentQuestionIndex].correctAnswer) {
      score++;
    } else {
      wrongQuestions++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      submitQuiz();
    }
  }

  function submitQuiz() {
    clearInterval(timerInterval);
    showResults();
  }

  function showResults() {
    startButton.style.display = 'none';
    submitButton.style.display = 'none';
    questionContainer.style.display = 'none';
    optionsContainer.style.display = 'none';
    displayCorrect.style.display = 'block';


    const accuracy = ((questions.length - wrongQuestions) / questions.length) * 100;
    scoreContainer.innerText = `Your Score: ${score}/${questions.length}`;
    scoreContainer.innerText += `\nAccuracy: ${accuracy.toFixed(2)}%`;
  }
});
