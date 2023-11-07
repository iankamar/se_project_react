export const baseUrl =
  process.env.NODE_ENV === process.env.REACT_APP_API_URL ||
  "http://localhost:3001";
console.log(baseUrl);

/*
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
*/

export const handleServerResponse = (res) => {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return Promise.reject(
      `Expected JSON but received ${contentType || "unknown format"}: ${
        res.status
      }`
    );
  }
};

export const request = async (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

/*
export const getItemList = async () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
*/

export const getItemList = async () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.headers.get("Content-Type") !== "application/json") {
      throw new Error("Server returned an HTML error page");
    }
    return res.json();
  });
};

export const addItem = async (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.name,
      link: item.link,
      weather: item.weather,
    }),
  });
};

export const removeItem = async (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const register = async ({ name, avatar, email, password }) => {
  console.log("Registering user:", email, password, name, avatar);
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).catch((error) => {
    console.error("Error during registration:", error);
    throw error;
  });
};

export const login = async ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = async (token) => {
  return request(`${baseUrl}/checkToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUser = async () => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((data) => {
    return data;
  });
};

export const updateUser = async (id, name, avatar) => {
  return request(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
};

export const authorize = async (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data;
    }
  });
};

export const addCardLike = (_id) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const removeCardLike = (_id) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
