'use client'
import CardBolao, { PoolCardProps } from "@/components/bolao/CardBolao";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

import { apiClient } from "@/services/api";
const { api } = apiClient;


export default function Bolao() {
  const router = useRouter()
  const [bolao, setBolao] = useState<PoolCardProps[]>([]);

  async function fechBolao() {
    try {
      const response = await api.get('/bolao');
      const responsePendencia = await api.get('/pendencias/me');
      setBolao(response.data.bolao);
      //setPendencias(responsePendencia.data.pendencias);
    } catch (error) {
      console.log(error);
    } finally {

    }
  }

  useEffect(() => {
    fechBolao()
  }, [])
  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meus Bolões</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section >
          {
            bolao.map((item) => {
              return <CardBolao data={item} />
            })
          }
        </section>
      </main>
    </div>
  )
}
