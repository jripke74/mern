import { useState } from 'react';

import NewGoal from '../NewGoal/NewGoal.jsx';
import GoalList from '../GoalList/GoalList.jsx';

import './Goals.css';

export default function Goals() {
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
