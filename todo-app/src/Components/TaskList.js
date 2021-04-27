import React from 'react';
import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
}));

const TaskList = ({ tasks, toggleComplete, removeTask, editTaskTitle, editTaskDate }) => {
  const classes = useStyles();

  return (
    <div className={classes.list}>
      {tasks.map((t) => (
        <Task
          key={t.id}
          task={t}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
          editTaskTitle={editTaskTitle}
          editTaskDate={editTaskDate}
        />
      ))}
    </div>
  );
};

export default TaskList;
