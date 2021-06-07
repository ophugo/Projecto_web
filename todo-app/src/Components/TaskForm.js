import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
  const [task, setTask] = useState({
    id: '',
    title: '',
    date: '',
    completed: false,
  });

  const handleTaskTitleChange = (e) => {
    setTask({ ...task, title: e.target.value });
  };

  const handTaskDateChange = (e) => {
    setTask({ ...task, date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.title.trim()) {
      addTask({ ...task, id: uuidv4() });
      setTask({ ...task, title: '', date: '' });
      setShown(true);
    }
  };

  const classes = useStyles();

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
          maxLength: 41
        }}
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
        type="datetime-local"
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
