import quizCompleteImg from './assets/quiz-complete.png';
import QUESTIONS from './assets/questions.js';
import classes from './Summary.module.css';

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );

  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id={classes.summary}>
      <img src={quizCompleteImg} alt="Trophy icon for quiz" />
      <h2>Quiz Completed!</h2>
      <div id={classes['summary-stats']}>
        <p>
          <span className={classes.number}>{skippedAnswersShare}%</span>
          <span className={classes.text}>skipped</span>
        </p>
        <p>
          <span className={classes.number}>{correctAnswersShare}%</span>
          <span className={classes.text}>answered correctly</span>
        </p>
        <p>
          <span className={classes.number}>{wrongAnswersShare}%</span>
          <span className={classes.text}>answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = `${classes['user-answer']}`;

          if (answer === null) {
            cssClass += ` ${classes.skipped}`;
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ` ${classes.correct}`;
          } else {
            cssClass += ` ${classes.wrong}`;
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className={classes.question}>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
