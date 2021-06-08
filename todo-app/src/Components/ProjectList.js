import React from 'react';
import Project from './Project';
import { makeStyles } from "@material-ui/core/styles";

//Estilos (Css) del componente
export const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
}));

const ProjectList = ({ projects, removeProject }) => {

  const classes = useStyles();

  // Lista de todos los proyectos, mediante un mapeo, se le pasan los aprametros necesarios
  return (
    <div className={classes.list}>
      {projects.map((p) => (
        <Project key={p.id} project={p} removeProject={removeProject} />
      ))}
    </div>
  );
};

export default ProjectList;
