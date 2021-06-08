import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CheckBox from '@material-ui/core/CheckBox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fragment } from 'react';
import APIService from "../APIService";

//Estilos (Css) del componente
export const useStyles = makeStyles((theme) => ({
  buttons: {
    margin:0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  checkbox: {
    padding: theme.spacing(1),
    margin: 0,
  },
  checked: {
    color: 'blue'
  },
  delete: {
    color: '#cc1919',
    padding: theme.spacing(1),
    margin: 0,
  },
  task: {
    width: '100%',
    // minWidth: '45%',
    display: 'flex',
    flexDirection: 'column',
    wordWrap: 'break-word',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(255,255,255)',
    boxShadow: '6px 6px 20px rgba(122,122,122,0.212)',
  },
  textField: {
    width: '100%',
  },
  dateField: {
    marginTop: 20,
    width: '200',
  },
  outline: {
    '&::before': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
}));

const Task = ({ task, toggleComplete, removeTask, editTaskTitle, editTaskDate }) => {
  const [isEditing, setEditing] = useState(false);

  //Función que manda a llamar las funciones correspondientes al manejo del completado de tarea
  const handleCheckboxClick = () => {
    toggleComplete(task);
  };

  //Función que manda a llamar las funciones correspondientes a la eliminación de tarea
  const handleRemoveTask = () => {
    removeTask(task.id);
    deleteTareas(task.id);
  };

  //Función que manda a llamar el web service para la eliminación de la tarea
  const deleteTareas = (id) => {
    APIService.deleteSubProjects(id);
  };

  //Función que manda a llamar la funcion correspondiente a la edición del título de tarea
  const handleEditTitleTask = (e) => {
    editTaskTitle(task, e.target.value);
  };

  //Función que manda a llamar la funcion correspondiente a la edición de la fecha de tarea
  const handleEditDateTask = (e) => {
    editTaskDate(task, e.target.value);
  };


  const classes = useStyles();

  /*
    Estructura del componente tarea, en este componente de igual forma se realiza la edición del mismo,
    por lo cual, se optó a tener texfield editables, los cuales al ser cambiados, mandarán a llamar el web service
    correspondiente que de igual forma actualizará su valor en la base de datos.
  */
  return (
    <div
      style={{
        boxShadow: task.completed && '0px 0px 10px rgb(125, 255, 65)',
        border: task.completed ? '3px solid #90ee90' : '3px solid rgb(255,255,255)',
      }}
      className={classes.task}
    >
      <Grid item xs={12} container className={classes.buttons}>
        <CheckBox
          className={classes.checkbox}
          checked={task.completed}
          onClick={handleCheckboxClick}
          style ={{
            color: task.completed ? '#90ee90' : '#381613',
          }}
        />
        <IconButton 
          aria-label="Delete"
          color="primary"
          className={classes.delete}
          onClick={handleRemoveTask}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <form className={classes.form} onSubmit={null}>
        <TextField
          id="task-title"
          name="title"
          type="text"
          label="Task title"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="on"
          multiline
          rowsMax="4"
          defaultValue="Task title"
          InputLabelProps={{ shrink: true, required: false, focused: true }}
          InputProps={{
            classes: {
              root: classes.outline,
            },
          }}
          inputProps={{ maxLength: 80 }}
          value={task.title}
          className={classes.textField}
          onChange={handleEditTitleTask}
          required
        />
        {task.date && 
            <TextField
              id="task-date"
              label="Completion date"
              type="date"
              value={task.date}
              onChange={handleEditDateTask}
              className={classes.dateField}
              InputLabelProps={{ shrink: true, focused: true }}
              InputProps={{
                classes: {
                  root: classes.outline,
                },
              }}
              noValidate
            />
        }
      </form>    
    </div>
  );
};

export default Task;
