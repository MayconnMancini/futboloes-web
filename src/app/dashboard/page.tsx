"use client";
import JoinBolao from "@/components/bolao/JoinBolao";
import { AuthContext } from "@/contexts/AuthContext";
import { apiClient } from "@/services/api";

const { api } = apiClient;
import { useContext, useEffect } from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  async function getUserInfo() {
    try {
      const userInfoResponse = await api.get("/me");
      console.log(userInfoResponse);
    } catch (error) {
      console.log("getUserInfo", error);
    }
  }

  useEffect(() => {
    //getUserInfo();
  }, []);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div>
          {/* Your content */}
          <h3 className=" text-zinc-700 font-semibold ">
            Bem vindo ao Futbolões {user?.nome}
          </h3>

          <p className="text-base text-green-600 mt-2">
            Ainda não participa de um bolão? Digite o código do Bolão abaixo e
            comece a sua disputa!{" "}
          </p>
          <section className="mt-6">
            <JoinBolao />
          </section>
        </div>
      </main>
    </div>
  );
}
