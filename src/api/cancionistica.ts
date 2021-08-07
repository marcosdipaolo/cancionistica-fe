import axios from "axios";

const cancionistica = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default cancionistica;
