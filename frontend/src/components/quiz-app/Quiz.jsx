import { useState } from 'react';

import QUESTIONS from './assets/questions.js';
import quizCompleteImg from './assets/quiz-complete.png';
import classes from './Quiz.module.css';

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswer.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  if (quizIsComplete) {
    return (
      <div className={classes.summary}>
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shufffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shufffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id={classes.quiz}>
      <div id={classes.question}>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id={classes.answers}>
          {shufffledAnswers.map((answer) => (
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
