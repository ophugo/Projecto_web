import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CheckBox from '@material-ui/core/CheckBox';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fragment } from 'react';

export const useStyles = makeStyles((theme) => ({
  buttons: {
    margin:0,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  checkbox: {
    padding: theme.spacing(1),
    margin: 0,
    color: '#90ee90',
  },
  checked: {
    color: 'red'
  },
  delete: {
    color: '#cc1919',
    padding: theme.spacing(1),
    margin: 0,
  },
  task: {
    width: '100%',
    minWidth: '45%',
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

  const handleCheckboxClick = () => {
    toggleComplete(task.id);
  };

  const handleRemoveTask = () => {
    removeTask(task.id);
  };

  const handleEditTitleTask = (e) => {
    editTaskTitle(task.id, e.target.value);
    setEditing(true);
  };

  const handleEditDateTask = (e) => {
    editTaskDate(task.id, e.target.value);
    setEditing(true);
  };

  const classes = useStyles();

  return (
    <div
      style={{
        boxShadow: task.completed && '0px 0px 20px rgb(125, 255, 65)',
      }}
      className={classes.task}
    >
      <Grid item xs={12} container className={classes.buttons}>
        <CheckBox
          className={classes.checkbox}
          checked={task.completed}
          onClick={handleCheckboxClick}
          inputProps={{
            classes: {
              root: classes.checked,
            },
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
        multiline
        rowsMax="4"
        defaultValue="Task title"
        InputLabelProps={{ shrink: true, required: false, focused: true }}
        InputProps={{
          classes: {
            root: classes.outline,
          }, 
          maxLength: 41
        }}
        value={task.title}
        className={classes.textField}
        onChange={handleEditTitleTask}
        required
      />
      {/* <input value={task.title} onChange={handleEditTitleTask} className="Task-Title"/> */}


      {task.date && 
          <TextField
            id="task-date"
            label="Completion date"
            type="datetime-local"
            value={task.date}
            onChange={handleEditDateTask}
            className={classes.dateField}
            InputLabelProps={{ shrink: true, focused: true }}
            InputProps={{
              classes: {
                root: classes.outline,
              },
            }}
            novalidate
          />
      }
      {isEditing && 
        <Button variant="outlined" color="primary" type="submit" >
          Update task
        </Button>
      }
      </form>
      {/* <p className="Task-Date">{task.date}</p> */}

      {/* <Button variant="outlined" color="primary" onClick={handleEditTask}> Edit Task </Button> */}
      {/*<Button variant="outlined" color="primary" onClick={handleRemoveTask}>
        Remove Task
      </Button>*/}
      
    </div>
  );
};

export default Task;
