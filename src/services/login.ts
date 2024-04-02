const { api } = apiClient;
import { apiClient } from "@/services/api";
import { message } from "antd";

export async function loginFutboloes(email: string, senha: string) {
  try {
    return await api.post("/login", {
      email: email,
      senha: senha,
    });
  } catch (error) {
    message.error(error.response);
  }
}
