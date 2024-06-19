import { useState, useCallback } from 'react';

import QUESTIONS from './assets/questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import quizCompleteImg from './assets/quiz-complete.png';
import Answers from './Answers.jsx';
import classes from './Quiz.module.css';
import Question from './Question.jsx';

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

  return (
    <div id={classes.quiz}>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
