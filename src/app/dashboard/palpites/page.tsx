"use client";
import { Button, Select, DatePicker, message, Spin } from "antd";
import { useEffect, useState } from "react";
import ptBr from "antd/lib/locale/pt_BR";
import { apiClient } from "@/services/api";
import { JogoPalpite } from "@/components/palpite/JogoPalpite";
const { api } = apiClient;
const { Option } = Select;

export default function Palpites() {
  const [boloes, setBoloes] = useState<PoolCardProps[]>([]);
  const [bolaoSelected, setBolaoSelected] = useState<string>();
  const [jogosBolao, setJogosBolao] = useState<JogoBolaoProps[]>([]);
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
      fechJogosBolao();
    }
  }, [bolaoSelected]);

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
                {/* Your content */}
                <p>Faça seu palpite</p>
              </div>
              <Button type="primary">Button</Button>
              <div>
                <DatePicker format={"DD/MM/YYYY"} />
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
