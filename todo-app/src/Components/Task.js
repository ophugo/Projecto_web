import React from 'react';
import Button from '@material-ui/core/Button';
import CheckBox from '@material-ui/core/CheckBox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  checkbox: {
    padding: '0',
  },
  task: {
    minWidth: '350px',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #b2d9a7',
    backgroundColor: '#d9fad0',
    margin: '20px',
    wordWrap: 'break-word',
    padding: '5px',
    '& *': {
      margin: '10px 10px',
      fontSize: '15px',
    },
  },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

const Task = ({ task, toggleComplete, removeTask, editTaskTitle, editTaskDate }) => {
  const handleCheckboxClick = () => {
    toggleComplete(task.id);
  };

  const handleRemoveTask = () => {
    removeTask(task.id);
  };

  const handleEditTitleTask = (e) => {
    editTaskTitle(task.id, e.target.value);
  };

  const handleEditDateTask = (e) => {
    editTaskDate(task.id, e.target.value);
  };

  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: task.completed ? '#b2d9a7' : null,
      }}
      className={classes.task}
    >
      <CheckBox
        className={classes.checkbox}
        checked={task.completed}
        onClick={handleCheckboxClick}
        color="primary"
      />
      <p></p>
      <strong>Task:</strong>

      <Input
        name="title"
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={handleEditTitleTask}
        required
      />
      {/* <input value={task.title} onChange={handleEditTitleTask} className="Task-Title"/> */}


      {task.date ? <strong>Completion Date:</strong> : null}

      <TextField
        label="Completion date"
        type="datetime-local"
        value={task.date}
        onChange={handleEditDateTask}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        novalidate
      />

      {/* <p className="Task-Date">{task.date}</p> */}

      {/* <Button variant="outlined" color="primary" onClick={handleEditTask}> Edit Task </Button> */}
      <Button variant="outlined" color="primary" onClick={handleRemoveTask}>
        Remove Task
      </Button>
    </div>
  );
};

export default Task;
