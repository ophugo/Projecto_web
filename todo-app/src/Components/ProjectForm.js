import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  inputForm: {
    margin: '0 1px',
  },
}));

const ProjectForm = ({ addProject }) => {
  const [project, setProject] = useState({
    id: '',
    title: '',
  });

  const handleProjectTitleChange = (e) => {
    setProject({ ...project, title: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (project.title.trim()) {
      addProject({ ...project, id: uuidv4() });

      setProject({ ...project, title: '' });
    }
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className={classes.inputForm}
        placeholder="Title"
        value={project.title}
        onChange={handleProjectTitleChange}
        inputProps={{ 'aria-label': 'description' }}
        required
      />

      <Button variant="outlined" color="primary" type="submit">
        Add
      </Button>
    </form>
  );
};

export default ProjectForm;
