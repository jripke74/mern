import { useState } from 'react';
import './NewGoal.css';

export default function NewGoal({ onAddGoal }) {
  const [enteredText, setEnteredText] = useState('');

  const addGoalHandler = function (event) {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };

    setEnteredText('');

    onAddGoal(newGoal);
  };

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={textChangeHandler} />
      <button type="submit">Add Goal</button>
    </form>
  );
}
