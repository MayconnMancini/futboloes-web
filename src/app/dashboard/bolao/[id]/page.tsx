"use client";
import CardJogosBolao from "@/components/bolao/CardJogosBolao";
import CardBolao from "@/components/bolao/CardJogosBolao";
import HeaderBolao from "@/components/bolao/HeaderBolao";
import { getBolao } from "@/services/bolao/bolao";
import { Button, message } from "antd";
import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";

import { IoMdArrowBack } from "react-icons/io";

interface BolaoProps {
  params: {
    id: string;
  };
}

export default function BolaoDetailsPage({ params }: BolaoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [bolaoDetails, setBolaoDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );

  async function fetchBolaoDetails() {
    try {
      setIsLoading(true);

      const response = await getBolao(params.id);
      if (response) {
        setBolaoDetails(response.data.bolao);
      }
    } catch (error) {
      console.log(error);

      message.error("Erro ao buscar dados do bolão");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBolaoDetails();
  }, [params.id]);

  return (
    <section>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Detalhes Bolão {params?.id}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <section className="mb-5">
          <HeaderBolao
            data={bolaoDetails}
            bolao_id={params.id}
            donoBolaoId={bolaoDetails.donoBolaoId}
          />
          <div className="flex justify-end mt-3 align-middle">
            <Link href="/dashboard/bolao">
              <Button
                style={{ display: "flex" }}
                type="default"
                icon={
                  <IoMdArrowBack
                    size={18}
                    style={{ position: "relative", top: 3 }}
                  />
                }
              >
                Voltar
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <CardJogosBolao bolao_id={params.id} />
        </section>
      </main>
    </section>
  );
}
