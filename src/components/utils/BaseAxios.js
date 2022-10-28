import axios from "axios";
const BaseAxios = axios.create({
  baseURL: "http://localhost:3001/",
});
export default BaseAxios;
