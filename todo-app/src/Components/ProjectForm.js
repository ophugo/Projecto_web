import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

//Estilos (Css) del componente
const useStyles = makeStyles((theme) => ({
  form: {
    width: '65%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    [theme.breakpoints.down("sm")]: {
      width: '80%',
    },
    [theme.breakpoints.down("xs")]: {
      width: '100%',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  outline: {
    '&::before': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    color:`${theme.palette.text.secondary} !important`,
  },
  submitBtn: {
    height: '100%'
  }
}));

  // Estructura local del proyecto
const ProjectForm = ({ addProject }) => {
  const [project, setProject] = useState({
    id: '',
    title: '',
  });

  // Manejo del cambio al título del proyecto a crear
  const handleProjectTitleChange = (e) => {
    setProject({ ...project, title: e.target.value });
  };

  // Funcón encargada de hacer el submit de la creación de los proyectos, y la limpia de los textfields
  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.title.trim()) {
      addProject({ ...project, id: uuidv4() });
      setProject({ ...project, title: '' });
    }
  };

  const classes = useStyles();

  /*
    Estructura del componente, el cual contiene un formulario con el textfield del 
    titulo del proyecto, así como el botón que manda a hacer la creación del proyecto.
  */
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        id="project-name"
        className={classes.input}
        label="Title"
        value={project.title}
        onChange={handleProjectTitleChange}
        autoComplete='off'
        autoCorrect="off"
        autoCapitalize="on"
        spellCheck="false"
        InputLabelProps={{ required: false }}
        InputProps={{
          classes: {
            root: classes.outline,
          },
        }}
        inputProps={{ 'aria-label': 'Title', maxLength: 41  }}
        required
        autoFocus
      />

      <Button variant="outlined" color="primary" className={classes.submitBtn} type="submit">Add</Button>
    </form>
  );
};

export default ProjectForm;
