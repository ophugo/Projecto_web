import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  project: {
    // border: '1px solid #c7ecec',
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
  },
  showTasks: {
    margin: '30px 0',
    width: '100%',
  }
}));



const Project = ({ project, removeProject }) => {
  const [tasks, setTasks] = useState([]);
  const [isShown, setShown] = useState(false)

  const setVisible = () => {
    setShown(!isShown);
  }
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const classes = useStyles();

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTaskTitle = (id, title) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: title,
          };
        }
        return task;
      })
    );
  };

  const editTaskDate = (id, date) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            date: date,
          };
        }
        return task;
      })
    );
  };

  return (
    <div className={classes.project}>
      <Box className={classes.projectTitle}>{project.title}</Box>
      <TaskForm setShown={setShown} addTask={addTask} />
      {tasks.length >0 &&
        <Button className={classes.showTasks} color="primary" variant="contained" onClick={setVisible}>{( isShown ? 'Hide tasks': 'Show tasks' )}</Button>
      }
      {isShown ?
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
          editTaskTitle={editTaskTitle}
          editTaskDate={editTaskDate}
        />
        : <Divider></Divider>
      }
    </div>
  );
};

export default Project;
