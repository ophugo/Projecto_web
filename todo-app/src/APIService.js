class APIService {
  static loginUser(body) {
    return fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static registerUser(body) {
    return fetch("http://127.0.0.1:8000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static getID(token) {
    return fetch(`http://127.0.0.1:8000/getid/${token}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json());
  }

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

  static getSubProjects(id) {
    return fetch(`http://127.0.0.1:8000/subprojects/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  static updateProject(body, id) {
    return fetch(`http://127.0.0.1:8000/oneproject/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static updateSubProject(body, id) {
    return fetch(`http://127.0.0.1:8000/subprojects/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static registerSubProject(body) {
    return fetch("http://127.0.0.1:8000/subprojects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static registerProject(body) {
    return fetch("http://127.0.0.1:8000/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static deleteProjects(id) {
    return fetch(`http://127.0.0.1:8000/projects/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

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
