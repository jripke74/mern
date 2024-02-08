import './NewGoal.css';

export default function NewGoal({ onAddGoal }) {
  const addGoalHandler = function (event) {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: 'My new goal',
    };

    onAddGoal(newGoal);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" />
      <button type="submit">Add Goal</button>
    </form>
  );
}
