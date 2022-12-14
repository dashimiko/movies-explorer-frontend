export const BASE_URL = `https://api.explorer.students.nomoredomains.sbs`;

const checkResponse = (res) => {
  if (res.ok) {
    console.log(res)
    return res.json();
  } else {
    return res.json().then((data) => {
      throw new Error(data.message);
    });
  }
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({name, email, password}),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: 'include',
  }).then(checkResponse)
};
