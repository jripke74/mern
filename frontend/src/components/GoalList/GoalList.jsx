import './GoalList.css';

export default function GoalList({ goals }) {
  return (
    <ul className="goal-list">
      {goals.map((goal) => {
        return <li key={goal.id}>{goal.text}</li>;
      })}
    </ul>
  );
}
