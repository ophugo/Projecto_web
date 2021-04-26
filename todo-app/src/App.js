import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./Components/Home";
import Login from "./Components/Login";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" component={Login} />
          </Switch>
        </Router>
      </CookiesProvider>
    </div>
  );
};

export default App;
