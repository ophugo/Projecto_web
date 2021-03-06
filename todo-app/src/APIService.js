class APIService {
  //Web service para el logueo del usuario
  static loginUser(body) {
    return fetch("https://salty-lowlands-70665.herokuapp.com/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para el registro del usario
  static registerUser(body) {
    return fetch(
      "https://salty-lowlands-70665.herokuapp.com/subprojects/user/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((response) => response.json());
  }

  //Web service para la obtención del id del usuario
  static getID(token) {
    return fetch(
      `https://salty-lowlands-70665.herokuapp.com/subprojects/${token}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => response.json());
  }

  //Web service para la obtención de todos los proyectos del usuario
  static getProjects(id) {
    return fetch(
      `https://salty-lowlands-70665.herokuapp.com/subprojects/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch(console.log("dosen't have projects"));
  }

  //Web service para la obtención de todos las tareas del proyecto
  static getSubProjects(id) {
    return fetch(
      `https://salty-lowlands-70665.herokuapp.com/subprojects/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
  }

  //Web service para la actualización de valores de proyecto
  static updateProject(body, id) {
    return fetch(
      `https://salty-lowlands-70665.herokuapp.com/subprojects/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((response) => response.json());
  }

  //Web service para la actualización de valores de tarea
  static updateSubProject(body, id) {
    return fetch(
      `https://salty-lowlands-70665.herokuapp.com/subprojects/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((response) => response.json());
  }

  //Web service para la creación de tarea
  static registerSubProject(body) {
    return fetch("https://salty-lowlands-70665.herokuapp.com/subprojects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la creación de proyecto
  static registerProject(body) {
    return fetch("https://salty-lowlands-70665.herokuapp.com/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  //Web service para la eliminación de proyecto
  static deleteProjects(id) {
    return fetch(`https://salty-lowlands-70665.herokuapp.com/projects/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  //Web service para la eliminación de tarea
  static deleteSubProjects(id) {
    return fetch(
      `https://salty-lowlands-70665.herokuapp.com/subprojects/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default APIService;
