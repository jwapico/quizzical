import React from 'react';

function Question(props) {
  return ( 
    <div className='question'>
      <p>{props.question}</p>
      <div className="button-container">
        {props.shuffledAnswers}
      </div>
    </div>
  );
}

export default Question;