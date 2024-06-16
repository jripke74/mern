import quizLogo from './assets/quiz-logo.png';
import classes from './QuizHeader.module.css';

export default function Header() {
  return (
    <header>
      <img src={quizLogo} alt="Quiz Logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
