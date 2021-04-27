import React from 'react';
import Project from './Project';

const ProjectList = ({ projects, removeProject }) => {
  return (
    <div>
      {projects.map((p) => (
        <Project key={p.id} project={p} removeProject={removeProject} />
      ))}
    </div>
  );
};

export default ProjectList;
