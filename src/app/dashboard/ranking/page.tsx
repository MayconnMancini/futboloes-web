"use client";

import { Ranking } from "@/components/ranking/Ranking";
import { useEffect, useState } from "react";
import { RankingItem } from "@/components/ranking/RankingItem";
import { apiClient } from "@/services/api";
const { api } = apiClient;

export default function RankingPage() {
  const [ranking, setRanking] = useState<ListRankingData[]>([]);

  async function fetchRanking() {
    try {
      const response = await api.get(`/ranking/bolao/11`);
      console.log(response.data);

      setRanking(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Ranking
          </h1>
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
