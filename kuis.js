const questions = [
  {
    question: "berapa hari seminggu ?",
    optionA : "10days",
    optionB : "14days",
    optionC : "5days",
    optionD : "7days",
    correctOption: "optionD"
  },

  {
    question: "siapa presiden kita ?",
    optionA : "Barack Obama",
    optionB : "SBY",
    optionC : "Trump",
    optionD : "Joko Widodo",
    correctOption: "optionD"
  },
  {
    question: "ada berapa bulan dalam setahun ?",
    optionA : "10bulan",
    optionB : "12bulan",
    optionC : "5bulan",
    optionD : "7bulan",
    correctOption: "optionB"
  },
  {
    question: "1 hari ada berapa jam",
    optionA : "10 jam",
    optionB : "14 jam",
    optionC : "24 jam",
    optionD : "7 jam",
    correctOption: "optionC"
  },
  {
    question: "yang mana yang bilangan genap?",
    optionA : "10",
    optionB : "15",
    optionC : "9",
    optionD : "7",
    correctOption: "optionA"
  },
]

let shuffledQuestions = []

function handleQuestions() {
  while (shuffledQuestions.length <= 4) {
    const random = questions[Math.floor(Math.random() * questions.length)]
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random)
    }
  }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

function NextQuestion(index) {
  handleQuestions()
  const currentQuestion = shuffledQuestions[index]
  document.getElementById("question-number").innerHTML = questionNumber
  document.getElementById("player-score").innerHTML = playerScore
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]
  const currentQuestionAnswer = currentQuestion.correctOption
  const options = document.getElementsByName("option");
  let correctOption = null

  options.forEach((option) => {
    if(option.value === currentQuestionAnswer) {
      correctOption = option.labels[0].id
    }
  })

if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
  // document.getElementById('option-modal').style.display = "flex"
  playerScore
  indexNumber++

  setTimeout(()=> {
    questionNumber++
  }, 1000)
}

options.forEach((option)=> {
  if (option.checked === true && option.value === currentQuestionAnswer) {
    document.getElementById(correctOption).style.backgroundColor = "green"
    playerScore++
    indexNumber++

    setTimeout(() => {
      questionNumber++
    }, 1000)
  }

  else if (option.checked && option.value !== currentQuestionAnswer) {
    const wrongLabelId = option.labels[0].id
    document.getElementById(wrongLabelId).style.backgroundColor = "red"
    document.getElementById(correctOption).style.backgroundColor = "green"
    playerScore--
    wrongAttempt++
    indexNumber++

    setTimeout(() => {
      questionNumber++
    }, 1000)
  }
})
}

function handleNextQuestion() {
  checkForAnswer()
  unCheckRadioButtons()

  setTimeout(() => {
    if (indexNumber <= 4) {
      NextQuestion(indexNumber)
    }
    else {
      handleEndGame()
    }
    resetOptionBackground()
  }, 1000);
}

function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = ""
  })
}

function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i =0; i < options.length; i++) {
    options[i].checked = false ;
  }
}

function handleEndGame() {
  let remark = null
  let remarkColor = null

  if (playerScore <= 1  ) {
    remark = "bad , semangat"
    remarkColor = "red"
  }
  else if (playerScore >= 2 && playerScore <= 4) {
    remark = "semangat"
    remarkColor = "green"
  }

  else if (playerScore == 5) {
    remark = "Excellent"
    remarkColor = "green"
  }

  const playerGrade = (playerScore) * 20

document.getElementById('remarks').innerHTML = remark
document.getElementById('remarks').style.color = remarkColor
document.getElementById('grade-percentage').innerHTML =playerGrade
document.getElementById('wrong-answers').innerHTML = wrongAttempt
document.getElementById('right-answers').innerHTML = playerScore
document.getElementById('score-modal').style.display= "flex"

}

function closeScoreModal() {
  questionNumber = 1
  playerScore = 0
  wrongAttempt = 0
  indexNumber = 0
  shuffledQuestions = []
  NextQuestion(indexNumber)
  document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
  document.getElementById('option-modal').style.display = "none"
}
