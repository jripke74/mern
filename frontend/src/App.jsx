import { BrowserRouter as Routes, Route } from 'react-router-dom';

import './App.css';

import Goals from './goals/components/Goals/Goals.jsx';

function App() {
  return (
    <Routes>
      <Route path="/goals" exact>
        <Goals />
      </Route>
    </Routes>
  );
}

export default App;
