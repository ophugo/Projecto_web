import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import ApiService from "../APIService";

export const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    flexFlow: "column wrap",
  },
}));

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [subProjects, setSubProjects] = useState([]);
  const [projectId, setProjectId] = useState(0);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const [ID, setID] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  let history = useHistory();

  function addProject(project) {
    setProjects([project, ...projects]);
  }

  function removeProject(id) {
    setProjects(projects.filter((p) => p.id !== id));
  }

  // const getUserID = () => {
  //   ApiService.getID(token["mytoken"])
  //     .then((resp) => resp.json)
  //     .then((resp) => setID(resp))
  //     .then(getAllProjects(ID));
  // };

  const getAllProjects = (id) => {
    ApiService.getProjects(id).then((resp) => setProjects(resp));
  };

  const getAllSub = (id) => {
    ApiService.getSubProjects(id).then((resp) => setSubProjects(resp));
  };

  useEffect(() => {
    if (token["mytoken"] !== "undefined") {
      if (token["mytoken"]) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        history.push("/login");
      }
    } else {
      setLoggedIn(false);
      history.push("/login");
    }
  }, [token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/getid/${token["mytoken"]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => getAllProjects(response.id));
  }, [token]);

  const classes = useStyles();

  return (
    <div>
      <div className={classes.home}>
        {projects.map((project) => {
          return (
            <div>
              <h1>{project.title}</h1>
              <h2>{project.id}</h2>
              <div></div>
            </div>
          );
        })}
        {/* {subProjects.map((sub) => {
          return (
            <div>
              <h1>{sub.title}</h1>
            </div>
          );
        })} */}
        {/* <Typography variant="h3" gutterBottom>
          Projects
        </Typography>
        <ProjectForm addProject={addProject} />
        <ProjectList projects={projects} removeProject={removeProject} /> */}
      </div>
    </div>
  );
};

export default Home;
