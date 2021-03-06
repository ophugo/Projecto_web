import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ApiService from "../../APIService";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//Estilos (Css) del componente
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    alignContent: "center",
    overflow: "hidden",
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: 1.5,
  },
  login: {
    display: "block",
  },
  loginbtn: {
    marginRight: 10,
    marginTop: 10,
    cursor: "pointer",
  },
  buttonSection: {
    background: "white",
    paddingTop: 75,
    paddingBottom: 70,
  },
  containerGrid: {
    height: "auto",
    width: "auto",
    padding: 100,
    backgroundColor: "white",

    background: "white",
    background:
      "linear-gradient(to right top, rgba(114, 246, 255, 0.829), rgba(92, 195, 255, 0.822))",
    borderRadius: 30,
    backdropFilter: "blur(2rem)",
    boxShadow: "6px 6px 20px rgba(122,122,122,0.212)",
  },
  grid: {
    display: "block",
    width: "auto",
    alignContent: "center",
  },
  input: {
    width: "100%",
    padding: "6px 12px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  title: {
    color: "purple",
    fontWeight: "bolder",
    fontSize: 28,
    [theme.breakpoints.up("md")]: {
      fontSize: 35,
    },
  },
  text: {
    color: "purple",
    fontSize: 18,
    textAlign: "center",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(15),
      paddingRight: theme.spacing(15),
      fontSize: 25,
    },
  },
  buttonFont: {
    color: "black",
    backgroundColor: "none",
    borderColor: "black",
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: 1.5,
  },
  color: {
    color: "purple",
  },
}));

const MainInfo = () => {
  //Manejo de variables correspondientes a los datos del usuario
  const [error, setError] = useState({ bool: false, type: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  let history = useHistory();

  //Funci??n encargada de la inicializaci??n del componente
  useEffect(() => {
    if (token["mytoken"] !== "undefined") {
      if (token["mytoken"]) {
        history.push("/");
      }
    } else {
      setError({
        bool: true,
        type: "No se encontro usuario o la combinacion de usuario y contrase??a no es la correcta",
      });

      setToken("mytoken", "");
      setUsername("");
      setPassword("");
    }
  }, [token]);

  //Manejo del login del usuario mediante web service
  const loginBtn = (event) => {
    event.preventDefault();
    ApiService.loginUser({ username, password }).then((resp) => {
      setToken("mytoken", resp.token);
    });
  };

  //Func??n que checa si las contrase??as primera y de confirmaci??n son iguales
  const checkPasswordBoolean = () => {
    if (password !== confirmPassword) {
      return (
        <p style={{ color: "red", fontSize: 12 }}>No es la misma contrase??a</p>
      );
    } else {
      return;
    }
  };

  //Manejo de visualizaci??n de mensajes de error/??xito
  const checkError = () => {
    if (error.bool) {
      return <p style={{ color: "red", fontSize: 12 }}>{error.type}</p>;
    } else {
      return <p style={{ color: "green", fontSize: 12 }}>{error.type}</p>;
    }
  };

  //Funci??n con web service para la creaci??n del usuario
  const registerBtn = (event) => {
    // perform all neccassary validations
    ApiService.registerUser({
      username,
      password,
      first_name,
      last_name,
      email,
    }).then((resp) => {
      if (
        resp.email &&
        resp.password &&
        resp.username &&
        first_name &&
        last_name &&
        email
      ) {
        setPassword("");
        setLogin(true);
        setError({ bool: false, type: "Cuenta creada exitosamente" });
      } else if (resp.email) {
        setError({ bool: true, type: resp.email });
        console.log(error.type);
      } else if (resp.password) {
        setError({ bool: true, type: resp.password });
        console.log(error.type);
      } else if (resp.username) {
        setError({ bool: true, type: resp.username });
        console.log(error.type);
      }
    });
    event.preventDefault();
  };

  const classes = useStyles();

  //Estructura del login y signup de la aplicaci??n, contiene un formulario para cada uno
  return (
    <div className={classes.root}>
      <Grid
        className={classes.containerGrid}
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid className={classes.grid} data-aos="fade-up" item xs={12} lg={6}>
          {isLogin ? (
            <h3 className={classes.title} style={{ color: "white" }}>
              Login
            </h3>
          ) : (
            <h3 className={classes.title} style={{ color: "white" }}>
              Sign up
            </h3>
          )}
          <div className={classes.login}>
            {checkError()}
            <form id="formLogin" onSubmit={isLogin ? loginBtn : registerBtn}>
              <label htmlFor="username" style={{ color: "white" }}>
                Usuario
              </label>
              <input
                className={classes.input}
                required
                type="text"
                id="username"
                placeholder="Introduce usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div>
                <label htmlFor="password" style={{ color: "white" }}>
                  Contrase??a
                </label>
                <input
                  className={classes.input}
                  minLength="8"
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Introduce contrase??a"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                  <div>
                    <label htmlFor="password" style={{ color: "white" }}>
                      Confirmar Contrase??a
                    </label>
                    <input
                      className={classes.input}
                      minLength="8"
                      type="password"
                      id="confirm_password"
                      placeholder="Introduce contrase??a"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {checkPasswordBoolean()}
                    <label htmlFor="firstName" style={{ color: "white" }}>
                      Nombre
                    </label>
                    <input
                      className={classes.input}
                      required
                      type="text"
                      id="firstName"
                      placeholder="Introduce nombre"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="lastName" style={{ color: "white" }}>
                      Apellido
                    </label>
                    <input
                      className={classes.input}
                      required
                      type="text"
                      id="lastName"
                      placeholder="Introduce apellido"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="email" style={{ color: "white" }}>
                      Email:
                      <input
                        className={classes.input}
                        required
                        type="text"
                        id="email"
                        placeholder="Introduce correo electronico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                )}
              </div>
              {isLogin ? (
                <div>
                  <Button
                    className={classes.loginbtn}
                    formtarget="formLogin"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Button
                    className={classes.loginbtn}
                    variant="contained"
                    onClick={() => {
                      setLogin(false);
                      setError({
                        bool: false,
                        type: "",
                      });
                    }}
                  >
                    registrarte
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    className={classes.loginbtn}
                    formtarget="_blank"
                    type="submit"
                    variant="contained"
                  >
                    Registrate
                  </Button>
                  <Button
                    className={classes.loginbtn}
                    variant="contained"
                    onClick={() => {
                      setLogin(true);
                      setError({
                        bool: false,
                        type: "",
                      });
                    }}
                  >
                    login
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainInfo;
