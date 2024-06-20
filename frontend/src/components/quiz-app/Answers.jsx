import { useRef } from 'react';

import classes from './Answers.module.css';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shufffledAnswers = useRef();

  if (!shufffledAnswers.current) {
    shufffledAnswers.current = [...answers];
    shufffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id={classes.answers}>
      {shufffledAnswers.current.map((answer) => {
        const isSeleceted = selectedAnswer === answer;
        let cssClass = '';

        if (answerState === 'answered' && isSeleceted) {
          cssClass = ` ${classes.selected}`;
        }

        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSeleceted
        ) {
          cssClass = ` ${classes[answerState]}`;
        }

        return (
          <li key={answer} className={classes.answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
