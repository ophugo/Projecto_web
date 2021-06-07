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
    return fetch(`http://127.0.0.1:8000/getid/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json());
  }

  static getProjects(id) {
    return fetch(`http://127.0.0.1:8000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  static getSubProjects(id) {
    return fetch(`http://127.0.0.1:8000/subprojects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
}

export default APIService;
