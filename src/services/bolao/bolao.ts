const { api } = apiClient;
import { apiClient } from "@/services/api";
import { message } from "antd";

export async function joinBolao(codigo: string) {
  try {
    return await api.post("/bolao/join/pendencias", {
      codigo,
    });
  } catch (error) {
    console.log("error", error?.response?.data?.message);
    message.error(error?.response?.data?.message);
  }
}
