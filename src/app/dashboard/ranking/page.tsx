"use client";

import { Ranking } from "@/components/ranking/Ranking";
import { useEffect, useState } from "react";
import { RankingItem } from "@/components/ranking/RankingItem";
import { apiClient } from "@/services/api";
import { Select } from "antd";
const { Option } = Select;

const { api } = apiClient;

export default function RankingPage() {
  const [ranking, setRanking] = useState<ListRankingData[]>([]);
  const [boloes, setBoloes] = useState<PoolCardProps[]>([]);
  const [bolaoSelected, setBolaoSelected] = useState<string>();

  async function fetchRanking() {
    try {
      const response = await api.get(`/ranking/bolao/${bolaoSelected}`);
      console.log(response.data);

      setRanking(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

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

  function handleSetarBolao(id: any) {
    localStorage.setItem("idBolaoSelected", JSON.stringify(id));
    setBolaoSelected(id);
  }

  useEffect(() => {
    fechBolao();
    getStoredidBolaoSelected();
  }, []);

  useEffect(() => {
    fetchRanking();
  }, []);

  useEffect(() => {
    if (bolaoSelected) {
      fetchRanking();
    }
  }, [bolaoSelected]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Ranking
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

          {ranking.map((item, index) => {
            return <RankingItem data={item} index={index} />;
          })}
        </div>
      </main>
    </div>
  );
}
