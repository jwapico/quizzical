import React from 'react';
import Question from './Question';

function QuizScreen({onEnd, isStarted}) {
  const [questions, setQuestions] = React.useState(null)
  const [isPlaying, setIsPlaying] = React.useState(true)

  // decodes HTML entities from the API
  function decodeText(txt) {
    const text = document.createElement("textarea")
    text.innerHTML = txt
    return text.value
  }

  // shuffles a random array to get answers in random order
  function shuffle(orderedArray) {
    let currentIndex = orderedArray.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [orderedArray[currentIndex], orderedArray[randomIndex]] = [
        orderedArray[randomIndex], orderedArray[currentIndex]];
    }
    return orderedArray;
  }

  // Gets and parses the data from openTB API and updates the questions state to be an array of objects containing data about each question
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {

        const questions = []

        data.results.map(question => {
          const shuffledAnswers = shuffle([decodeText(question.correct_answer), ...question.incorrect_answers.map(answer => decodeText(answer))])
          const answers = shuffledAnswers.map(answer => ({value: answer, isSelected: false, classes: ""}))

          questions.push({
            correctAnswer: decodeText(question.correct_answer),
            answers: answers,
            questionText: decodeText(question.question)
          })
        })

        setQuestions(questions)
      })
  }, [])

  // changes the state of questions to make the isSelected attribute of each answer of each question match the option the user selected. 
  function handleClick(answerValue) {
    setQuestions(prevQuestions => {
      const newQuestions = []
      for (const question in prevQuestions) {
        const currentQuestion = prevQuestions[question]
        for (let i = 0; i < prevQuestions[question].answers.length; i++) {
          if (prevQuestions[question].answers[i].value === answerValue) {
            for (let i = 0; i < prevQuestions[question].answers.length; i++) {
              currentQuestion.answers[i].isSelected = false
            }
            currentQuestion.answers[i].isSelected = !currentQuestion.answers[i].isSelected
          }
        }
        newQuestions.push(currentQuestion)
      }
      return newQuestions
    })
  }

  function handleCheck() {
    setQuestions(prevQuestions => {
      const newQuestions = []
      for (const question of prevQuestions) {
        const currentQuestion = question
        for (let i = 0; i < question.answers.length; i++) {
          if (question.answers[i].isSelected && question.answers[i].value === question.correctAnswer) {
            currentQuestion.answers[i].classes = "correct-answer"
          } else if (question.answers[i].isSelected && question.answers[i].value !== question.correctAnswer) {
            currentQuestion.answers[i].classes = "incorrect-answer"
          } else if (!question.answers[i].isSelected && question.answers[i].value === question.correctAnswer) {
            currentQuestion.answers[i].classes = "incorrect-correct-answer"
          }
        }
        newQuestions.push(currentQuestion)
      }
      return newQuestions
    })

    setIsPlaying(false)
  }

  function getEndGameButton() {
    if (isPlaying) {
      return <button className='check-answers-btn' onClick={handleCheck}>Check answers</button>
    } 

    let totalCorrect = 0
    for (const question of questions) {
      for (let i = 0; i < question.answers.length; i++) {
        if (question.answers[i].isSelected && question.answers[i].value === question.correctAnswer) {
          totalCorrect++
        }
      }
    }

    return (
      <div className='play-again-container'>
        <p>You scored {totalCorrect}/5 answers correct!</p>
        <button className='check-answers-btn' onClick={onEnd}>Play again</button>
      </div>      
    )
  }

  return ( 
    <div className='question-screen'>
      <div className="question-screen-content">
        {questions ? questions.map((question, index) => <Question question={question} key={index} handleClick={isPlaying ? handleClick : null}/>) 
        : <p>Loading...</p>}
        {questions && getEndGameButton()}  
      </div>
    </div>
  );
}

export default QuizScreen;