import axios from "axios";

export const realtor = axios.create({
  baseURL: "https://realtor.p.rapidapi.com/properties"
});
