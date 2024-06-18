import { useState, useCallback } from 'react';

import QUESTIONS from './assets/questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from './assets/quiz-complete.png';
import classes from './Quiz.module.css';

export default function Quiz() {
  const [userAnswers, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null), [handleSelectAnswer];
  });

  if (quizIsComplete) {
    return (
      <div id={classes.summary}>
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
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
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
