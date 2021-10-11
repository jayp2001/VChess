import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import { SocketContext, socket } from "./context/socket";
import { PlayerColorProvider } from "./hook/player_provider";

import HomePage from "./pages/homepage";
import GamePage from "./pages/gamepage";


function App() {
  return (

    <PlayerColorProvider>
      <Router>
        <Switch>
          <SocketContext.Provider value={socket}>
            <Route path={ROUTES.HOMEPAGE} exact component={HomePage} />
            <Route path={ROUTES.GAMEPAGE} exact component={GamePage} />
          </SocketContext.Provider>
        </Switch>
      </Router>
    </PlayerColorProvider>

  );
}

export default App;
