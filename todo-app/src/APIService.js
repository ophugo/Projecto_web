class APIService {
  //Web service para el logueo del usuario
  static loginUser(body) {
    return fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para el registro del usario
  static registerUser(body) {
    return fetch("http://127.0.0.1:8000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la obtención del id del usuario
  static getID(token) {
    return fetch(`http://127.0.0.1:8000/getid/${token}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json());
  }

  //Web service para la obtención de todos los proyectos del usuario
  static getProjects(id) {
    return fetch(`http://127.0.0.1:8000/projects/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch(console.log("dosen't have projects"));
  }

  //Web service para la obtención de todos las tareas del proyecto
  static getSubProjects(id) {
    return fetch(`http://127.0.0.1:8000/subprojects/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  //Web service para la actualización de valores de proyecto
  static updateProject(body, id) {
    return fetch(`http://127.0.0.1:8000/oneproject/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la actualización de valores de tarea
  static updateSubProject(body, id) {
    return fetch(`http://127.0.0.1:8000/subprojects/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la creación de tarea
  static registerSubProject(body) {
    return fetch("http://127.0.0.1:8000/subprojects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la creación de proyecto
  static registerProject(body) {
    return fetch("http://127.0.0.1:8000/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la eliminación de proyecto
  static deleteProjects(id) {
    return fetch(`http://127.0.0.1:8000/projects/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  //Web service para la eliminación de tarea
  static deleteSubProjects(id) {
    return fetch(`http://127.0.0.1:8000/subprojects/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default APIService;
