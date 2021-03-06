import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Home from "./Components/Home";
import Login from "./Components/Login";
import "./App.css";
import { Grid } from "@material-ui/core";

//Ruteo de la aplicación, ya sea al menú de la app ó el login/singup en caso de no haber ingresado
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
