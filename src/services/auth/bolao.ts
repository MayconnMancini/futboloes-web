const { api } = apiClient;
import { apiClient } from "@/services/api";
import { message } from "antd";

export async function postCadastrarUser(body: CreateUser) {
  try {
    return await api.post("/signup", {
      body,
    });
  } catch (error) {
    console.log("error", error?.response?.data?.message);
    message.error(error?.response?.data?.message);
  }
}
