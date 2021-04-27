import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  project: {
    border: '1px solid #c7ecec',
    backgroundColor: '#d0fafa',
    margin: '50px',
    padding: '0',
  },
  
  projectTitle: { 
    margin: '0 0 30px 0',
    fontSize: '30px',
  },
}));



const Project = ({ project, removeProject }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
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
      <strong className={classes.projectTitle}>{project.title}</strong>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        removeTask={removeTask}
        editTaskTitle={editTaskTitle}
        editTaskDate={editTaskDate}
      />
    </div>
  );
};

export default Project;
