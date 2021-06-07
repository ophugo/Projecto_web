import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./components/Home";
import Login from "./components/Login";
import "./App.css";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid item xs={12} container className="app">
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" component={Login} />
          </Switch>
        </Router>
      </CookiesProvider>
    </Grid>
  );
};

export default App;
