import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

//Estilos (Css) del componente
export const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  textField: {
    marginRight: theme.spacing(3),
    width: '39%',
  },
  dateField: {
    marginRight: theme.spacing(3),
    width: '39%',
  },
  button: {
    width: '22%',
  },
  outline: {
    '&::before': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    color:`${theme.palette.text.secondary} !important`,
  },
}));

const TaskForm = ({ setShown, addTask }) => {
  // Estructura local de la tarea
  const [task, setTask] = useState({
    title: '',
    date: '',
    completed: false,
  });

  // Manejo del cambio al título de la tarea a crear
  const handleTaskTitleChange = (e) => {
    setTask({ ...task, title: e.target.value });
  };

  // Manejo del cambio a la fecha de la tarea a crear
  const handTaskDateChange = (e) => {
    setTask({ ...task, date: e.target.value });
  };

  // Funcón encargada de hacer el submit de la creación de las tareas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.title.trim()) {
      addTask(task);
      setTask({ ...task, title: '', date: '' });
      // APIService.registerSubProjec({id});
      setShown(true);
    }
  };

  const classes = useStyles();

  /*
    Estructura del componente, el cual contiene un formulario con el textfield del 
    titulo y un textfield tipo fecha para la fecha de cumplimiento de la tarea,
    así como el botón que manda a hacer la creación de la tarea
  */
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        id="new-task-title"
        name="title"
        type="text"
        label="Task"
        className={classes.textField}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="on"
        spellCheck="false"
        multiline
        rowsMax="4"
        value={task.title}
        onChange={handleTaskTitleChange}
        InputLabelProps={{ shrink: true, required: false, focused: true }}
        InputProps={{
          classes: {
            root: classes.outline,
          }, 
        }}
        inputProps={{ maxLength: 80 }}
        onKeyDown={(e) => {
          if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e)
          }
        }}
        required
        autoFocus
      />
      <TextField
        id="new-task-date"
        label="Completion date"
        type="date"
        className={classes.dateField}
        value={task.date}
        onChange={handTaskDateChange}
        InputLabelProps={{ shrink: true, focused: true }}
        InputProps={{
          classes: {
            root: classes.outline,
          },
        }}
      />
      <Button className={classes.button} color="primary" variant="outlined" type="submit">Add task</Button>
    </form>
  );
};

export default TaskForm;
