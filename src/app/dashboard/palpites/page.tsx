"use client";
import { Button, Select, DatePicker, message, Spin } from "antd";
import { useEffect, useState } from "react";
import ptBr from "antd/lib/locale/pt_BR";
import { apiClient } from "@/services/api";
import { JogoPalpite } from "@/components/palpite/JogoPalpite";
import {
  getJogosPalpiteBolaoData,
  getRodadasBolao,
} from "@/services/bolao/bolao";
const { api } = apiClient;
const { Option } = Select;

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

export default function Palpites() {
  const [boloes, setBoloes] = useState<PoolCardProps[]>([]);
  const [bolaoSelected, setBolaoSelected] = useState<string>();
  const [rodadaSelected, setRodadaSelected] = useState<string>();
  const [jogosBolao, setJogosBolao] = useState<JogoBolaoProps[]>([]);
  const [rodadas, setRodadas] = useState<RodadasProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fechBolao() {
    try {
      const response = await api.get("/bolao");
      setBoloes(response.data.bolao);
    } catch (error) {
      console.log(error);
    }
  }

  async function fechJogosBolao() {
    try {
      setIsLoading(true);
      const response = await api.get(`/bolao/${bolaoSelected}/jogos/palpites`);
      setJogosBolao(response.data.jogos_bolao);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fechJogosBolaoRodada() {
    try {
      setIsLoading(true);

      if (!bolaoSelected || !rodadaSelected) {
        return;
      }
      const response = await getJogosPalpiteBolaoData(
        bolaoSelected,
        rodadaSelected
      );
      if (response?.data) {
        setJogosBolao(response.data.jogos_bolao);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        setJogosBolao([]);
        setRodadas([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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

  useEffect(() => {
    fechBolao();
    getStoredidBolaoSelected();
  }, []);

  useEffect(() => {
    if (bolaoSelected) {
      fechRodadasBolao();
      //fechJogosBolao();
    }
  }, [bolaoSelected]);

  useEffect(() => {
    if (bolaoSelected) {
      fechJogosBolaoRodada();
    }
  }, [rodadaSelected]);

  function handleSetarBolao(id: any) {
    localStorage.setItem("idBolaoSelected", JSON.stringify(id));
    setBolaoSelected(id);
  }

  return (
    <div>
      <header className="bg-white shadow ">
        <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Palpites
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
        <Spin spinning={isLoading}>
          {isLoading ? (
            <></>
          ) : (
            <>
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

              {jogosBolao?.length ? (
                jogosBolao?.map((jogo) => {
                  return <JogoPalpite data={jogo} index={Number(jogo.id)} />;
                })
              ) : (
                <h3>Nenhum jogo cadastrado</h3>
              )}
            </>
          )}
        </Spin>
      </main>
    </div>
  );
}
