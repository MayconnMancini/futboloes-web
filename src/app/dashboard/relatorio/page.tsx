"use client";

import { Ranking } from "@/components/ranking/Ranking";
import { useEffect, useState } from "react";
import { RankingItem } from "@/components/ranking/RankingItem";
import { apiClient } from "@/services/api";
import { Select, Spin, message } from "antd";
import { getRodadasBolao } from "@/services/bolao/bolao";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { getStatusPalpite } from "@/services/relatorio/relatorio";

const { Option } = Select;

const { api } = apiClient;

export default function RankingPage() {
  const [ranking, setRanking] = useState<ListRankingData[]>([]);
  const [boloes, setBoloes] = useState<PoolCardProps[]>([]);
  const [bolaoSelected, setBolaoSelected] = useState<string>();
  const [rodadaSelected, setRodadaSelected] = useState<string>();
  const [rodadas, setRodadas] = useState<RodadasProps[]>([]);
  const [statusPalpites, setStatusPalpites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fechBolao() {
    try {
      const response = await api.get("/bolao");
      console.log(response.data);
      setBoloes(response.data.bolao);
    } catch (error) {
      console.log(error);
    }
  }

  function getStoredidBolaoSelected() {
    if (typeof window !== "undefined") {
      const idBolaoSelected = localStorage.getItem("idBolaoSelected");
      if (idBolaoSelected !== null) {
        try {
          const idBolao = JSON.parse(idBolaoSelected);
          setBolaoSelected(idBolao);
        } catch (error) {
          console.error(error);
        }
      }
    }
    return [];
  }

  async function fechRodadasBolao() {
    try {
      setIsLoading(true);
      const response = await getRodadasBolao(bolaoSelected?.toString() || "");
      if (response?.data?.data?.length) {
        const rodadas = response.data.data;

        setRodadas(rodadas);

        const today = dayjs().format("YYYY-MM-DD");
        const hasToday = rodadas.some(
          (rodada: any) => dayjs(rodada.data).format("YYYY-MM-DD") === today
        );

        if (hasToday) {
          setRodadaSelected(dayjs().format("YYYY-MM-DD"));
        } else if (rodadas.length > 0) {
          setRodadaSelected(dayjs(rodadas[0].data).format("YYYY-MM-DD"));
        }
      } else {
        setRodadaSelected("");
        setRodadas([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetStatusPalpites() {
    try {
      setIsLoading(true);
      if (bolaoSelected && rodadaSelected) {
        const resp = await getStatusPalpite(bolaoSelected, rodadaSelected);

        setStatusPalpites(resp ?? []);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSetarBolao(id: any) {
    localStorage.setItem("idBolaoSelected", JSON.stringify(id));
    setBolaoSelected(id);
  }

  useEffect(() => {
    fechBolao();
    getStoredidBolaoSelected();
  }, []);

  useEffect(() => {
    if (bolaoSelected) {
      fechRodadasBolao();
    }
  }, [bolaoSelected]);

  useEffect(() => {
    handleGetStatusPalpites();
  }, [bolaoSelected, rodadaSelected]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Relatório
            </h1>
          </div>

          <div>
            <Select
              showSearch
              style={{ minWidth: "150px" }}
              placeholder="Selecione um bolão"
              optionFilterProp="children"
              onChange={(opt) => handleSetarBolao(opt)}
              //onSearch={onSearch}
              //filterOption={filterOption}
              value={bolaoSelected}
            >
              {boloes &&
                boloes?.map((bolao) => {
                  return (
                    <Option key={bolao.id} value={bolao.id}>
                      {bolao.nome}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div>
          {/* Your content */}

          <h2 className="text-green-700 font-bold">
            Relatório de Status do Palpite por rodada
          </h2>

          <div className="mt-5">
            <div>
              <h4>Selecione a rodada:</h4>
            </div>
            <div className="mb-5 mt-2">
              <Select
                showSearch
                style={{ minWidth: "350px" }}
                placeholder="Selecione uma rodada"
                optionFilterProp="children"
                onChange={(opt) => setRodadaSelected(opt)}
                //onSearch={onSearch}
                //filterOption={filterOption}
                value={rodadaSelected}
              >
                {rodadas &&
                  rodadas?.map((rodada) => {
                    return (
                      <Option key={rodada.rodada} value={rodada.data}>
                        Rodada: {rodada.rodada} - Data:{" "}
                        {dayjs(rodada.data)
                          .locale(ptBR)
                          .format("dddd - DD/MM/YYYY")
                          .toUpperCase()}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </div>

          <Spin spinning={isLoading}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className=" sticky left-0 z-10 bg-gray-50 max-w-xs px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Usuário
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Jogos
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Palpites
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Faltando
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statusPalpites.map((item, index) => (
                    <tr key={item.participante_id}>
                      <td className=" sticky left-0 z-10 bg-white max-w-xs px-4 py-2 text-sm text-gray-900 truncate">
                        {item.nome_usuario}
                      </td>
                      <td
                        className={`w-1/4 px-4 py-2 text-sm ${
                          item.status_palpites === "Pendente"
                            ? "text-orange-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.status_palpites}
                      </td>
                      <td className="w-1/4 px-4 py-2 text-sm text-gray-900">
                        {item.total_jogos_rodada}
                      </td>
                      <td className="w-1/4 px-4 py-2 text-sm text-gray-900">
                        {item.total_palpites_usuario}
                      </td>
                      <td className="w-1/4 px-4 py-2 text-sm text-gray-900">
                        {item.palpites_faltando}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Spin>
        </div>
      </main>
    </div>
  );
}
