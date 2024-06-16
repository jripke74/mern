import { useState } from 'react';

import QUESTIONS from './assets/questions.js';
import classes from './Quiz.module.css';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswer.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  return (
    <div id={classes.quiz}>
      <div id={classes.question}>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id={classes.answers}>
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className={classes.answer}>
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
