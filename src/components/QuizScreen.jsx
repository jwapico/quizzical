import React from 'react';
import Question from './Question';

function QuizScreen() {
  const [questionsArray, setQuestionsArray] = React.useState(null)
  const [scoreKeeper, setScoreKeeper] = React.useState({})
  
  // decodes HTML entities from the API
  function decodeText(txt) {
    const text = document.createElement("textarea")
    text.innerHTML = txt
    return text.value
  }

  // shuffles a random array to get random answers
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

  function handleClick(event, isCorrect, index) {
    const btnSiblings = event.target.parentElement.children
    for (let i = 0; i < btnSiblings.length; i++) {
      btnSiblings[i].className = ""
    }
    event.target.className = "selected-answer"
    setScoreKeeper(prevScores => {
      return {
        ...prevScores,
        [index]: isCorrect
      }
    })
  }

  // loop through questions, loop through answers, if answer is correct, add to count and change classname
  function checkAnswers() {

  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(response => response.json())
      .then(data => {
        const questions = data.results.map((item, index) => {
          const correctAnswer = decodeText(item.correct_answer)
          const shuffledAnswers = shuffle([decodeText(item.correct_answer), ...item.incorrect_answers.map(answer => decodeText(answer))])
          return <Question 
            key={index}  
            question={decodeText(item.question)}
            shuffledAnswers={shuffledAnswers.map((answer, index) => {
              const isCorrect = answer === correctAnswer
              return <button 
                key={index}
                onClick={(event) => {handleClick(event, isCorrect, index)}}>{answer}</button>
            })}/>
          }) 
          setQuestionsArray(questions)
      })
  }, [])

  function testing() {
    return questionsArray ? console.log(questionsArray[0].props.shuffledAnswers) : null
  }
  // testing()

  return ( 
    <div className='question-screen'>
      <div className="question-screen-content">
        {questionsArray && questionsArray}
        <button className='check-answers-btn' onClick={checkAnswers}>Check answers</button>
      </div>
    </div>
  );
}

export default QuizScreen;