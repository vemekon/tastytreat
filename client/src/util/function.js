import axios from "axios";

export const createProduct = async (product) => await axios.post(`/`, product);
export const signin = async (data) => await axios.post(`/signin`, data);
export const signup = async (data) => await axios.post(`/signup`, data);
export const signOut = async () => await axios.get(`/signout`);

export const saveUser = (id) => {
  localStorage.setUser("user", id);
};
export const getUser = () => {
  return localStorage.getUser("user") ? true : false;
};
export const removeUser = () => {
  return localStorage.removeUser("user") ? true : false;
};

export const getInquiries = async (order, limit, token) =>
  await axios.get(`/inquiries?order=${order}&limit=${limit}`, {
    headers: {
      "auth-token": token,
    },
  });

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
  next();
};
export const signOutt = (next) => {
  return axios
    .get(`/signout`)
    .then((response) => {
      localStorage.removeItem("jwt");
      response.json();
      next();
    })

    .catch((error) => console.log(error));
};

export const isauthenticate = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
