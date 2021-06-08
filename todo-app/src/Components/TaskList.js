import React from 'react';
import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';

//Estilos (Css) del componente
export const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));

const TaskList = ({ tasks, toggleComplete, removeTask, editTaskTitle, editTaskDate }) => {
  const classes = useStyles();

  // Lista de todas las tareas, mediante un mapeo, se le pasan los aprametros necesarios
  return (
    <div className={classes.list}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
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
