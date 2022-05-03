import React from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';

export default function App() {
  const [started, setStarted] = React.useState(false)

  function startQuiz() {
    setStarted(true)
  }

  return ( 
    <div>
      {!started && <StartScreen onStart={startQuiz}/>}
      {started && <QuizScreen />}
    </div>
  );
}
