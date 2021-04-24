import axios from "axios";
const url = process.env.BASE_URL;

console.log(url);

const api = axios.create({
  baseURL: url,
});

export default api;
