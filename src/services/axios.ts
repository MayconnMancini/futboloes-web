import axios, { AxiosError, AxiosInstance } from "axios";
import { parseCookies, setCookie } from "nookies";

//import { signOut } from "../contexts/AuthContext";

//import getConfig from "next/config";

export function setupToken(api: AxiosInstance, ctx: any = undefined) {
  api.interceptors.request.use(function (config) {
    const { "futboloes.token": token } = parseCookies(ctx);
    console.log("futboloes.token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}

export function setupAPIClient(ctx: any = undefined) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  setupToken(api, ctx);

  return { api };
}
