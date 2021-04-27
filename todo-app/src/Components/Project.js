import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Project = ({ project, removeProject }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

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
    <div className="Project">
      <strong className="Project-Title">{project.title}</strong>
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
