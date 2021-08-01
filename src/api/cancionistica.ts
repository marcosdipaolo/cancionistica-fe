import axios from "axios";

const cancionistica = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default cancionistica;
