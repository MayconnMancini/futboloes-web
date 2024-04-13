"use client";
import { useRouter } from "next/navigation";

interface Props {
  bolao_id: string;
  data: PoolCardProps;
  donoBolaoId: string;
  //onUpdateJogos: (value: string) => void;
}

export default function HeaderBolao({
  data,
  bolao_id,
  donoBolaoId,
}: //onUpdateJogos,
Props) {
  const router = useRouter();
  return (
    <div className="p-5 my-1 bg-zinc-200  rounded-sm items-center justify-between">
      <h3 className="text-xl font-bold">{data.nome}</h3>
      <h4>Código: {data.codigo}</h4>
    </div>
  );
}
