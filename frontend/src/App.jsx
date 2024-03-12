import { useState, useCallback, useEffect } from 'react';
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

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration)) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

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
