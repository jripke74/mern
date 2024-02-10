import {
  BrowserRouter as Routes,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Goals from './goals/components/Goals/Goals.jsx';
import Users from './user/pages/Users.jsx';
import NewPlace from './places/pages/NewPlace.jsx';
import MainNavigation from './shared/components/Navigation/MainNavigation.jsx';

function App() {
  return (
    <Routes>
      <MainNavigation />
      <main>
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
      </main>
    </Routes>
  );
}

export default App;
