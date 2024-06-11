import React, { Suspense, useState, useRef } from 'react';
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
import Player from './components/tic-tac-toe/Player.jsx';
import FinalPlayer from './components/final-countdown/FinalPlayer.jsx';
import GameBoard from './components/tic-tac-toe/GameBoard.jsx';
import Log from './components/tic-tac-toe/Log.jsx';
import GameOver from './components/tic-tac-toe/GameOver.jsx';
import Header from './components/tic-tac-toe/Header.jsx';
import { WINNING_COMBINATIONS } from './util/winning-combinations.js';
import UserInput from './components/tic-tac-toe/UserInput.jsx';
import Results from './components/tic-tac-toe/Results.jsx';
import AuthInputs from './components/react-art/AuthInputs.jsx';
import HeaderArt from './components/react-art/Header.jsx';
import TimerChalleng from './components/final-countdown/TimerChallenge.jsx';
import ProjectSidebar from './components/project-tracker/ProjectSidebar.jsx';
import NewProject from './components/project-tracker/NewProject.jsx';
import NoProjectSelected from './components/project-tracker/NoProjectSelected.jsx';
import SelectedProject from './components/project-tracker/SelectedProject.jsx';
import ShopHeader from './components/cloth-shop/ShopHeader.jsx';
import Shop from './components/cloth-shop/Shop.jsx';
import Product from './components/cloth-shop/Product.jsx';
import { DUMMY_PRODUCTS } from './components/cloth-shop/dummy-products.js';
import CartContextProvider from './store/shopping-cart-context.jsx';
import Places from './components/place-picker/Places.jsx';
import { AVAILABLE_PLACES } from './components/place-picker/data.js';
import PlacePickerModal from './components/place-picker/PlacePickerModal.jsx';
import DeleteConfirmation from './components/place-picker/DeleteConfirmation.jsx';
import logoImg from './components/place-picker/assets/logo3.png';
import Modal from './components/place-picker/PlacePickerModal.jsx';
import { sortPlacesByDistance } from './components/place-picker/loc.js';

const Goals = React.lazy(() => import('./goals/components/Goals/Goals.jsx'));

const NewPlace = React.lazy(() => import('./places/pages/NewPlace.jsx'));
const UserPlaces = React.lazy(() => import('./places/pages/UpdatePlace.jsx'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace.jsx'));
const Auth = React.lazy(() => import('./user/pages/Auth.jsx'));

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  const [players, setPlayers] = useState(PLAYERS);
  const { token, login, logout, userId } = useAuth();
  const [gameTurns, setGameTurns] = useState([]);
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude,
      position.coords.longitude
    );

    setAvailablePlaces(sortedPlaces);
  });

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((places) => places.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projecData) {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projecData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

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
        <Route path="/place-picker">
          <>
            <Modal ref={modal}>
              <DeleteConfirmation
                onCancel={handleStopRemovePlace}
                onConfirm={handleRemovePlace}
              />
            </Modal>

            <header>
              <img src={logoImg} alt="Stylized globe" />
              <h1>PlacePicker</h1>
              <p>
                Create your personal collection of places you would like to
                visit or you have visited.
              </p>
            </header>
            <main>
              <Places
                title="I'd like to visit..."
                fallBackText={
                  'Select the places you would like to visit below.'
                }
                places={pickedPlaces}
                onSelectPlace={handleStartRemovePlace}
              />
              <Places
                title="Available Places"
                places={availablePlaces}
                onSelectPlace={handleSelectPlace}
              />
            </main>
          </>
        </Route>
        <Route path="/cloth-shop">
          <CartContextProvider>
            <ShopHeader />
            <Shop>
              {DUMMY_PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Product {...product} />
                </li>
              ))}
            </Shop>
          </CartContextProvider>
        </Route>
        <Route path="/project-tracker">
          <main className="h-screen my-8 flex gap-8">
            <ProjectSidebar
              onStartAddProject={handleStartAddProject}
              projects={projectsState.projects}
              onSelectProject={handleSelectProject}
              selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
          </main>
        </Route>
        <Route path="/final-countdown">
          <header>
            <h1>
              The <em>Almost</em> Final Countdown
            </h1>
            <p>Stop the timer once you estimate that time is (almost) up</p>
          </header>
          <FinalPlayer />
          <div id="challenges">
            <TimerChalleng title="Easy" targetTime={1} />
            <TimerChalleng title="Not Easy" targetTime={5} />
            <TimerChalleng title="Getting tough" targetTime={10} />
            <TimerChalleng title="Pros only" targetTime={15} />
          </div>
        </Route>
        <Route path="/react-art">
          <HeaderArt />
          <main>
            <AuthInputs />
          </main>
        </Route>
        <Route path="/investment-calculator">
          <Header />
          <UserInput userInput={userInput} onChange={handleChange} />
          {!inputIsValid && (
            <p className="center">
              Plaease enter a duration greater than zeror.
            </p>
          )}
          {inputIsValid && <Results input={userInput} />}
        </Route>
        <Route path="/tic-tac-toe">
          <h1>Tic-Tac-Toe</h1>
          <main className="tic-tac-toe">
            <div id="game-container">
              <ol id="players" className="highLight-player">
                <Player
                  initialName={PLAYERS.X}
                  symbol="X"
                  isActive={activePlayer === 'X'}
                  onChangeName={handlePlayerNameChange}
                />
                <Player
                  initialName={PLAYERS.O}
                  symbol="O"
                  isActive={activePlayer === 'O'}
                  onChangeName={handlePlayerNameChange}
                />
              </ol>
              {(winner || hasDraw) && (
                <GameOver winner={winner} onRestart={handleRestart} />
              )}
              <GameBoard
                onSelectSquare={handleSelectSquare}
                board={gameBoard}
              />
            </div>
            <Log turns={gameTurns} />
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
