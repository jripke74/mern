import quizLogo from './assets/quiz-logo.png';
import classes from './QuizHeader.module.css';

export default function Header() {
  return (
    <header id={classes['quiz-header']}>
      <img src={quizLogo} alt="Quiz Logo" />
      <h1>React Quiz</h1>
    </header>
  );
}
