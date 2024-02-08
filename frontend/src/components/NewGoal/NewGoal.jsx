import './NewGoal.css';

export default function NewGoal() {
  const addGoalHandler = function (event) {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: 'My new goal',
    };

    console.log(newGoal);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" />
      <button type="submit">Add Goal</button>
    </form>
  );
}
