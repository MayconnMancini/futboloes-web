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

export async function getBolao(id: string) {
  try {
    return await api.get(`/bolao/${id}`);
  } catch (error) {
    console.log("error", error?.response?.data?.message);
    message.error(error?.response?.data?.message);
  }
}

export async function getRodadasBolao(id: string) {
  try {
    return await api.get(`/v2/bolao/${id}/rodadas`);
  } catch (error) {
    console.log("error", error?.response?.data?.message);
    message.error(error?.response?.data?.message);
  }
}

export async function getJogosPalpiteBolaoData(id: string, data: string) {
  try {
    return await api.get(`/v2/bolao/${id}/jogos/${data}/palpites`);
  } catch (error) {
    console.log("error", error?.response?.data?.message);
    message.error(error?.response?.data?.message);
  }
}
