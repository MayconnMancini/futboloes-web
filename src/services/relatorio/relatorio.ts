const { api } = apiClient;
import { apiClient } from "@/services/api";
import { message } from "antd";

export async function getStatusPalpite(id: string, data: string) {
  try {
    const result = await api.get(`/relatorio/palpites/status/${id}/${data}`);
    return result.data;
  } catch (error) {
    message.error(error?.response?.data?.message);
  }
}
