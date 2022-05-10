import { click } from '@testing-library/user-event/dist/click';
import React from 'react';

function Question(props) {
  const {answers, questionText} = props.question

  return ( 
    <div className='question'>
      <p>{questionText}</p>
      <div className="button-container">
        {answers.map((answer, index) => <button 
            onClick={() => props.handleClick ? props.handleClick(answer.value) : null} 
            key={index}
            className={answer.classes ? answer.classes : answer.isSelected ? "selected-answer" : ""}>{answer.value}</button>
          )
        }
      </div>
    </div>
  );
}

export default Question;