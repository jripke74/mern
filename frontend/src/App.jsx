import { useState } from 'react';

import GoalList from './components/GoalList/GoalList.jsx';
import NewGoal from './components/NewGoal/NewGoal.jsx';

import './App.css';

function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const addNewGoalHandler = function (newGoal) {
    setCourseGoals((prevCourseGoals) => prevCourseGoals.concat(newGoal));
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
