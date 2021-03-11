import httpService from "./httpService";
import {
  apiClienteEndpoint,
  apiVerifyAnagraficaEndpoint,
} from "../config.json";

export function getClienti(branch, nag, customerName, birthDate) {
  //ricavo il token
  const token = localStorage.getItem("TOKEN");
  const headers = {
    Authorization: ` ${token}`,
  };
  const conf = { headers: { ...headers } };

  let url = "?branch=" + branch + "&nag=" + nag;

  if (customerName !== "" && customerName !== undefined) {
    url = url + "&customerName=" + customerName;
  }

  if ((birthDate !== "") & (birthDate !== undefined)) {
    url = url + "&birthDate=" + birthDate;
  }
  console.log(url);
  return httpService.get(apiClienteEndpoint.concat(url), conf);
}

export function customerMarkAsEdited(campi, id) {
  const token = localStorage.getItem("TOKEN");
  const headers = {
    Authorization: ` ${token}`,
  };
  const conf = { headers: { ...headers } };

  const post = {
    id: id,
    email: campi[0].isChecked,
    firma: campi[8].isChecked,
    p1: campi[2].isChecked,
    p2: campi[3].isChecked,
    p3: campi[4].isChecked,
    p4: campi[5].isChecked,
    p5: campi[6].isChecked,
    p6: campi[7].isChecked,
    telefono: campi[1].isChecked,
  };

  //campi.map((campo) => (post[campo.value] = campo.isChecked));

  return httpService.post(apiVerifyAnagraficaEndpoint, post, conf);
}
