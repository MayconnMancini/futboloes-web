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
    console.log("error ==> ", error);
    message.error(
      error?.response?.data?.message ??
        error?.message ??
        `${api.getUri()} - Erro na requisicao`
    );
  }
}
