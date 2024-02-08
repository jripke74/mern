import { useState } from 'react';

import GoalList from './components/GoalList/GoalList.jsx';
import NewGoal from './components/NewGoal/NewGoal.jsx';

import './App.css';

function App() {
  const [courseGoals, setCourseGoals] = useState([
    { id: 'cg1', text: 'Finish the Course' },
    { id: 'cg2', text: 'earn all about the Course Main Topic' },
    { id: 'cg3', text: 'Help other students in the Course Q&A' },
  ]);

  const addNewGoalHandler = function (newGoal) {
    setCourseGoals(courseGoals.concat(newGoal));
  };

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
}

export default App;
