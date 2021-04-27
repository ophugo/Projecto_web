import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'

export const useStyles = makeStyles((theme) => ({
  form: {
    display: 'inline-block',
    "& ": {
        display: 'block',
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const TaskForm = ({ addTask }) => {
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
    }
  };

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>Task: </p>
      <Input
        name="title"
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={handleTaskTitleChange}
        required
      />
      <TextField
        label="Completion date"
        type="datetime-local"
        className={classes.textField}
        value={task.date}
        onChange={handTaskDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        novalidate
      />
      <Button color="secondary" variant="outlined" type="submit">Add task</Button>
    </form>
  );
};

export default TaskForm;
