import React, { useEffect, useState, useLayoutEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid, IconButton } from '@material-ui/core';
import APIService from "../APIService";
import ClearIcon from '@material-ui/icons/Clear';

//Estilos (Css) del componente
export const useStyles = makeStyles((theme) => ({
  buttons: {
    margin:0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  delete: {
    color: `${theme.palette.primary.main} !important`,
    padding: theme.spacing(1),
    margin: 0,
  },
  divider: {
    marginBottom: 3,
    background: theme.palette.primary.main,
  },
  project: {
    marginTop: 60,
    padding: 20,
    background: 'transparent',
    borderRadius: 20,
    maxWidth: '100%',
    background: 'linear-gradient(to right bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.3))',
    borderRadius: 15,
    boxShadow: '4px 4px 10px rgba(122,122,122,0.212)',
  },
  
  projectTitle: {
    marginBottom: 40,
    fontSize: '30px',
    fontWeight: 100,
    wordWrap: 'break-word',
  },
  showTasks: {
    margin: '30px 0 20px 0',
    width: '100%',
  }
}));



const Project = ({ project, removeProject }) => {
  const [tasks, setTasks] = useState([]);
  const [isShown, setShown] = useState(false)

  //Manejo de la visualización de la lista de tareas
  const setVisible = () => {
    setShown(!isShown);
  }

  //Función que manda a llamar las funciones correspondientes a la eliminación del proyecto
  const handleRemoveProject = () => {
    removeProject(project.id);
    deleteProject(project.id);
  };

  //Función que manda a llamar el web service para la eliminación del proyecto
  const deleteProject = (id) => {
    APIService.deleteProjects(id);
  };


  //Función que manda a llamar el web service para el añadido de una nueva tarea, con la asignación del id del proyecto asignado
  function addTask(task) {
    APIService.registerSubProject({"title": task.title, "date": task.date || null, "completed": task.completed, "project": project.id}).then((resp) => {
      setTasks([...tasks, resp]);
    });
  };

  //Función que inicializa las tareas del proyecto en curso
  useLayoutEffect(() => {
    if(project.notes){
      setTasks(project.notes);
    }
  }, []);

  //Función encargada del funcionamientode completado de tarea, actualización del boolean en base de datos mediante web service
  const toggleComplete = (t) => {
    APIService.updateSubProject({ "title": t.title, "completed": !t.completed, "project": project.id}, t.id).then((resp) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === t.id) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        })
      );
    });      
  };

  //Función encargada de eliminar la tarea mandada
  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  //Función encargada del funcionamientode de la edición del título de tarea, actualización del valor título en base de datos mediante web service
  const editTaskTitle = (t, title) => {
    APIService.updateSubProject({ "title": title, "completed": t.completed, "project": project.id}, t.id).then((resp) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === t.id) {
            return {
              ...task,
              title: title,
            };
          }
          return task;
        })
      );
    });
  };

  //Función encargada del funcionamientode de la edición de la fecha de tarea, actualización del valor fecha en base de datos mediante web service
  const editTaskDate = (t, date) => {
    APIService.updateSubProject({ "title": t.title, "date": date, "completed": t.completed, "project": project.id}, t.id).then((resp) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === t.id) {
            return {
              ...task,
              date: date,
            };
          }
          return task;
        })
      );
    });
  };

  const classes = useStyles();

  /*
    Estructura del componente proyecto, constituido del titilo y fecha del proyecto, 
    así como su botón de eliminación y el botón que muestra las tareas del proyecto.
    */
  return (
    <div className={classes.project}>
    <Grid item xs={12} container >
      <Grid item xs={11} >
        <Box className={classes.projectTitle}>{project.title}</Box>
      </Grid>
      <Grid item xs={1} className={classes.buttons}>
      
          <IconButton 
            aria-label="Delete"
            color="primary"
            className={classes.delete}
            onClick={handleRemoveProject}
          >
            <ClearIcon />
          </IconButton>
        </Grid>
        </Grid> 
      
      <TaskForm setShown={setShown} addTask={addTask} />
      {tasks.length > 0 &&
        <Button className={classes.showTasks} color="primary" variant="contained" onClick={setVisible}>{( isShown ? 'Hide tasks': 'Show tasks' )}</Button>
      }
      {(isShown && tasks.length > 0) ?
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
          editTaskTitle={editTaskTitle}
          editTaskDate={editTaskDate}
        />
        : [...Array(tasks.length)].map((e, i) => <Divider classes={{root: classes.divider}} ></Divider>)
      }
    </div>
  );
};

export default Project;
