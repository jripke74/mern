import {
  BrowserRouter as Routes,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Goals from './goals/components/Goals/Goals.jsx';
import Users from './user/pages/Users.jsx';
import NewPlace from './places/pages/NewPlace.jsx';
import UserPlaces from './places/pages/UserPlaces.jsx';
import MainNavigation from './shared/components/Navigation/MainNavigation.jsx';
import UpdatePlace from './places/pages/UpdatePlace.jsx';
import Auth from './user/pages/Auth.jsx';
import { AuthContext } from './shared/context/auth-context.js';
import { useAuth } from './shared/hooks/auth-hook.js';

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/goals" exact>
          <Goals />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Routes>
        <MainNavigation />
        <main>{routes}</main>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
