import axios from "axios";

// Create axios instance with base URL
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;