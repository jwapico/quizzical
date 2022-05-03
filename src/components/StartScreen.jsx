import React from 'react';

function StartScreen(props) {
  return ( 
    <div className='start-screen'>
      <h1>Quizzical</h1>
      <p>Test your trivia skills</p>
      <button onClick={props.onStart}>Start Quiz</button>
    </div>
  );
}

export default StartScreen;