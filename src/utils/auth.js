export const AUTH_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${AUTH_URL}/signup` , {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email,password})})
    .then(response => response.json());
  }


