import {House} from "../models/house";

const SERVER_URL = process.env.REACT_APP_API_URL;

type Method = "GET" | "POST" | "PUT";

const PREDICT_ENDPOINT = SERVER_URL + "/v2/prediction";

export const request = async (path: string, method: Method, body?: string | FormData) => {
  const headers = new Headers();
  // headers.append("Content-Type", "application/json");
  // headers.append("Access-Control-Allow-Origin", "*");
  // // headers.append("Access-Control-Allow-Credentials", "true");
  // headers.append("Access-Control-Allow-Headers", "*");

  const response = await fetch(path, {method, mode: "cors", body, headers});
  if (response.status === 200) return response.json();
  else throw new Error("error" + response.status);
}

export const predictPrice = async (
  houseProps: House
) => {
  const data = await request(PREDICT_ENDPOINT, "POST", JSON.stringify(houseProps));
  return data;
}

export const predictCovid = async (
  body: FormData
) => {
  console.log({body})
  const data = await request(PREDICT_ENDPOINT, "POST", body);
  return data;
}

export const getLive = async () => {
  return await request(SERVER_URL + "/v2", "GET")
}
