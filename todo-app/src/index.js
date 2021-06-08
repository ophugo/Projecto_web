import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainInfo from "./Components/PageSeccions/LoginForm";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Template del tema (colores) de todo el proyecto
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0e5f92'
    },
    secondary: {
      main: '#00eeff'
    }
  }
});

//Render React
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
