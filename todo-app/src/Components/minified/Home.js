import React, { useState, useEffect } from "react";import ProjectForm from "./ProjectForm";import ProjectList from "./ProjectList";import { makeStyles } from "@material-ui/core/styles";import { Box, Button, Grid } from "@material-ui/core";import { useCookies } from "react-cookie";import { useHistory } from "react-router-dom";import ApiService from "../APIService";import APIService from "../APIService";import { Fragment } from "react";

export const useStyles = makeStyles((theme) => ({  home: {    display: 'flex',    padding: 30,    flexFlow: 'column wrap',    background: 'white',    width: '700px',    minHeight: '80vh',    background: 'linear-gradient(to right top, rgba(114, 246, 255, 0.829), rgba(92, 195, 255, 0.822))',    margin: '10vh',    marginTop: '5vh',    borderRadius: 30,    backdropFilter: 'blur(2rem)',    boxShadow: '6px 6px 20px rgba(122,122,122,0.212)',    [theme.breakpoints.down("sm")]: {      width: '60vh',    },    [theme.breakpoints.down("xs")]: {      width: '40vh',    },  },  logout: {    marginTop: 30,    borderRadius: 15,    background: 'linear-gradient(to right top, rgba(114, 246, 255, 0.829), rgba(92, 195, 255, 0.822))',    boxShadow: '6px 6px 30px rgba(122,122,122,0.212)',  },}));

const Home = () => {  const [projects, setProjects] = useState([]);  const [subProjects, setSubProjects] = useState([]);  const [projectId, setProjectId] = useState(0);  const [token, setToken, removeToken] = useCookies(["mytoken"]);  const [ID, setID] = useState(0);  const [loggedIn, setLoggedIn] = useState(false);

  let history = useHistory();

  function addProject(project) {    APIService.registerProject({title: project.title, user:ID}).then((resp) => {      setProjects([...projects, resp]);    });  }

  function removeProject(id) {    setProjects(projects.filter((p) => p.id !== id));  }

  const getAllProjects = (id) => {    ApiService.getProjects(id).then((resp) => {      setProjects(resp);      console.log(resp);    });    setID(id);  };

  useEffect(() => {    if (token["mytoken"] !== "undefined") {      if (token["mytoken"]) {        setLoggedIn(true);      } else {        setLoggedIn(false);        history.push("/login");      }    } else {      setLoggedIn(false);      history.push("/login");    }  }, [token]);

  useEffect(() => {    fetch(`http://127.0.0.1:8000/getid/${token["mytoken"]}`, {      method: "GET",      headers: {        "Content-Type": "application/json",        Authorization: `Token ${token}`,      },    })      .then((response) => response.json())      .then((response) => getAllProjects(response.id));  }, [token]);

  const classes = useStyles();

  return (    <Fragment>      <Button className={classes.logout} onClick={() => removeToken(["mytoken"])}>Logout</Button>      <Grid item xs={12} container alignItems="center" className={classes.home}>        <Box fontSize={50} color="text.secondary" fontWeight={200} style={{marginBottom: 30}}>          Projects        </Box>        <ProjectForm addProject={addProject} />        <ProjectList projects={projects} removeProject={removeProject} />      </Grid>    </Fragment>  );};

export default Home;

