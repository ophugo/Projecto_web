import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  home: {
    display: 'flex',
    padding: 30,
    flexFlow: 'column wrap',
    background: 'white',
    width: '100%',
    minHeight: '80vh',
    background: 'linear-gradient(to right top, rgba(114, 246, 255, 0.829), rgba(92, 195, 255, 0.822))',
    margin: '10vh',
    borderRadius: 30,
    backdropFilter: 'blur(2rem)',
    boxShadow: '6px 6px 20px rgba(122,122,122,0.212)',
    [theme.breakpoints.down("sm")]: {
      width: '60vh',
    },
    [theme.breakpoints.down("xs")]: {
      width: '40vh',
    },
  },
}));

const Home = () => {
  const [projects, setProjects] = useState([]);

  function addProject(project) {
    setProjects([project, ...projects]);
  }

  function removeProject(id) {
    setProjects(projects.filter((p) => p.id !== id));
  }

  const classes = useStyles();

  return (
      <Grid item xs={12} container alignItems="center" className={classes.home}>
        <Box fontSize={50} color="text.secondary" fontWeight={200} style={{marginBottom: 30}}>
          Projects
        </Box>
        <ProjectForm addProject={addProject} />
        <ProjectList projects={projects} removeProject={removeProject} />
      </Grid>
  );
};

export default Home;
