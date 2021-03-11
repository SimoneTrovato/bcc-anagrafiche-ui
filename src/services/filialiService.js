import httpService from "./httpService";
import { apiFilialiEndpoint } from "../config.json";

export function getFiliali() {
  const token = localStorage.getItem("TOKEN");
  const headers = {
    Authorization: ` ${token}`,
  };
  const conf = { headers: { ...headers } };

  return httpService.get(apiFilialiEndpoint, conf);
}
