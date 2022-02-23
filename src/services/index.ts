const SERVER = "localhost";
const PORT = "3001";
export const SERVER_URL = `http://${SERVER}:${PORT}`;

type Method = "GET" | "POST" | "PUT";

export const request = async (path: string, method: Method, body?: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Access-Control-Allow-Headers", "*");

  const response = await fetch(path, {method, mode: "cors", body, headers});
  if (response.status === 200) return response.json();
  else throw new Error("error" + response.status);
}
