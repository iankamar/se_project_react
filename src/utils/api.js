export const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

export const getItemList = () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

export const addCardLike = (_id) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

export const removeCardLike = (_id) => {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};
