const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let quizScore = 0

startButton.addEventListener('click', () => { //start button will start game and reset score
  startGame()
  document.getElementById('right-answers').innerText= 0
  quizScore = 0
})

nextButton.addEventListener('click', () => { //next will show next question
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() //starts the game
{
  startButton.classList.add('hide')
  //quizScore = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() //displays next question
{
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) //displays question
{
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')

    if (answer.correct) 
    {
      button.dataset.correct = answer.correct
    }

    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() //restarts after each choice
{
  clearStatusClass(document.body)
  nextButton.classList.add('hide')

  while (answerButtonsElement.firstChild) 
  {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) //what to do once user clicks answer
{
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  setStatusClass(document.body, correct)

  Array.from(answerButtonsElement.children).forEach(button => { 
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) //keep displaying next till the last question
  {
    nextButton.classList.remove('hide')
  } 
  else //display restart at last question
  {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }

  if(selectedButton.dataset = correct) //if answer is correct, add to score
  {
      quizScore++
  }

  document.getElementById('right-answers').innerText=quizScore
}

function setStatusClass(element, correct) //makes answer correct or wrong
{
  clearStatusClass(element)
  if (correct) 
  {
    element.classList.add('correct')
  } 
  else 
  {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element)  //clears the wrong and correct status for next question
{
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [ //questions and choices with the correct answer marked as true
    {
        question: 'What does “www” stand for in a website browser?',
        answers :[
            { text: 'Wild Wild West', correct: false},
            { text: 'Whole Wide World', correct: false},
            { text: 'World Wide Web', correct: true},
            { text: 'We Want Women', correct: false},
        ]
    },
    {
        question: 'What was the first feature-length animated movie ever released?',
        answers :[
            { text: 'Snow White and the Seven Dwarfs', correct: true},
            { text: 'The Wizard of Oz', correct: false},
            { text: 'Casablanca', correct: false},
            { text: 'Cinderella', correct: false},
        ]
    },
    {
        question: 'Which country invented ice cream?',
        answers :[
            { text: 'Poland', correct: false},
            { text: 'Switzerland', correct: false},
            { text: 'France', correct: false},
            { text: 'China', correct: true},
        ]
    },
    {
        question: 'Who was the sixth president of the United States?',
        answers :[
            { text: 'Abraham Lincoln', correct: false},
            { text: 'George Washington', correct: false},
            { text: 'John Quincy Adams', correct: true},
            { text: 'Thomas Jefferson', correct: false},
        ]
    },
    {
        question: 'How many hearts does an octopus have?',
        answers :[
            { text: '2', correct: false},
            { text: '3', correct: true},
            { text: '4', correct: false},
            { text: '5', correct: false},
        ]
    },
    {
      question: 'What is the hottest planet in the solar system?',
      answers :[
          { text: 'Venus', correct: true},
          { text: 'Mars', correct: false},
          { text: 'Mercury', correct: false},
          { text: 'Earth', correct: false},
      ]
  },
  {
    question: 'Fe is the chemical symbol of which element?',
    answers :[
        { text: 'Silver', correct: false},
        { text: 'Gold', correct: false},
        { text: 'Mercury', correct: false},
        { text: 'Iron', correct: true},
    ]
},
{
  question: 'Which country produces the most coffee in the world?',
  answers :[
      { text: 'India', correct: false},
      { text: 'Brazil', correct: true},
      { text: 'Mexico', correct: false},
      { text: 'Peru', correct: false},
  ]
},
{
  question: 'Question: Which part of the computer fetches, decodes, and executes the programming instructions?',
  answers :[
      { text: 'Hard Drive', correct: false},
      { text: 'RAM', correct: false},
      { text: 'CPU', correct: true},
      { text: 'Motherboard', correct: false},
  ]
},
{
  question: 'What does UPS stand for?',
  answers :[
      { text: 'Ultra Proprietary Sugar', correct: false},
      { text: 'Unimpressed Preliminary Student', correct: false},
      { text: 'Unstoppable Pinging Site', correct: false},
      { text: 'Uninterruptible Power Supply', correct: true},
  ]
}
]