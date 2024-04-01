"use client";
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
          <p>Bem vindo ao Futbolões {user?.nome}</p>
        </div>
      </main>
    </div>
  );
}
