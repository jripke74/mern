import {
  BrowserRouter as Routes,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Goals from './goals/components/Goals/Goals.jsx';
import Users from './user/pages/Users.jsx';
import NewPlace from './places/pages/NewPlace.jsx';

function App() {
  return (
    <Routes>
      <Switch>
        <Route path="/goals" exact>
          <Goals />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Routes>
  );
}

export default App;
