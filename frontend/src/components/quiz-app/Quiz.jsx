import { useState } from 'react';

import QUESTIONS from './assets/questions.js';
import classes from './QuizHeader.module.css';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswer.length;

  return (
    <div id={classes.quiz}>
      <div id={classes.question}>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id={classes.answers}>
          <li key={answer} className={classes.answer}>
            <button>{answer}</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
