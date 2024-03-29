import React, { Suspense } from 'react';
import {
  BrowserRouter as Routes,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages/Users.jsx';
import MainNavigation from './shared/components/Navigation/MainNavigation.jsx';
import { AuthContext } from './shared/context/auth-context.js';
import { useAuth } from './shared/hooks/auth-hook.js';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner.jsx';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';

const Goals = React.lazy(() => import('./goals/components/Goals/Goals.jsx'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace.jsx'));
const UserPlaces = React.lazy(() => import('./places/pages/UpdatePlace.jsx'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace.jsx'));
const Auth = React.lazy(() => import('./user/pages/Auth.jsx'));

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
        <Route path="/tic-tac-toe">
          <h1>Tic-Tac-Toe</h1>
          <main>
            <div id="game-container">
              <ol id="players">
                <Player name="Player 1" symbol="X" />
                <Player name="Player 2" symbol="O" />
              </ol>
              <GameBoard />
            </div>
          </main>
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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
