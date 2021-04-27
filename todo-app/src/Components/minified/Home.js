import React, { useState } from "react"; import ProjectForm from "./ProjectForm"; import ProjectList from "./ProjectList"; import Typography from "@material-ui/core/Typography"; import { makeStyles } from "@material-ui/core/styles"; export const useStyles = makeStyles((theme) => ({   home: {     display: "flex",     flexFlow: "column wrap",   }, })); const Home = () => {   const [projects, setProjects] = useState([]);   function addProject(project) {     setProjects([project, ...projects]);   }   function removeProject(id) {     setProjects(projects.filter((p) => p.id !== id));   }   const classes = useStyles();   return (     <div>       <div className={classes.home}>         <Typography variant="h3" gutterBottom>           Projects         </Typography>         <ProjectForm addProject={addProject} />         <ProjectList projects={projects} removeProject={removeProject} />       </div>     </div>   ); }; export default Home;