import { joinBolao } from "@/services/bolao/bolao";
import { Button, Input, message } from "antd";
import { useState } from "react";

export default function JoinBolao() {
  const [isLoading, setIsLoading] = useState(false);
  const [codigo, setCodigo] = useState("");

  async function handleJoinBolao() {
    try {
      setIsLoading(true);
      if (!codigo.trim()) {
        setIsLoading(false);
        message.error("Informe o código do bolão!", 8);
        return;
      }

      const resp = await joinBolao(codigo);

      if (resp) {
        message.success(
          "Solicitação enviada com sucesso. Entre em contato com o ADMIN para ser aprovado no bolão!",
          10
        );
      }
    } catch (error) {
      message.error("Aconteceu algo inesperado", 5);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-zinc-200 p-3 rounded-lg">
      <h3 className="text-green-700 font-semibold py-1">
        Digite o código do Bolão para partipar
      </h3>
      <Input
        id="codigo"
        name="codigo"
        type="string"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <Button
        size="middle"
        type="primary"
        loading={isLoading}
        onClick={handleJoinBolao}
        style={{ width: "100%", margin: "10px 0" }}
      >
        Entrar no bolão
      </Button>
    </div>
  );
}
