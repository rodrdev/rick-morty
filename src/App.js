import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Persons from "./pages/persons";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Persons />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
