import quizCompleteImg from './assets/quiz-complete.png';
import QUESTIONS from './assets/questions.js';
import classes from './Summary.module.css';

export default function Summary({ userAnswers }) {
  return (
    <div id={classes.summary}>
      <div id={classes.summary}>
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
        <div id={classes['summary-stats']}>
          <p>
            <span className={classes.number}>10%</span>
            <span className={classes.text}>skipped</span>
          </p>
          <p>
            <span className={classes.number}>10%</span>
            <span className={classes.text}>sanswered correctly</span>
          </p>
          <p>
            <span className={classes.number}>10%</span>
            <span className={classes.text}>answered incorrectly</span>
          </p>
        </div>
        <ol>
          {userAnswers.map((answer, index) => {
            return (
              <li key={answer}>
                <h3>{index + 1}</h3>
                <p className={[classes.question]}>{QUESTIONS[index].text}</p>
                <p className={classes['user-answer']}>{answer}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
