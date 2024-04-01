const { api } = apiClient;
import { apiClient } from "@/services/api";
import { parseCookies } from "nookies";

export async function isLoggedIn() {
  console.log("isLoggedIn");
  try {
    const { "futboloes.token": token } = parseCookies();
    console.log(
      " pi.defaults.headers.common['Authorization'] ",
      api.defaults.headers.common["Authorization"]
    );
    console.log(" pi.defaults.headers.common['Authorization'] token", token);
    //
    //api.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response = await api.get("/me");
    console.log("response", response);
    if (response.status === 200) return true;
  } catch (error: any) {
    //console.log(error);
  }
  return false;
}
