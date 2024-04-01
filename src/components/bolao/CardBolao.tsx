'use client'
import { useRouter } from 'next/navigation'
export interface ParticipantProps {
  id: string;
  usuario: {
    nome: string;
    avatarUrl: string;
  };
};

export interface PoolCardProps {
  id: string;
  codigo: string;
  nome: string;
  donoBolaoId: string;
  createdAt: string;
  donoBolao: {
    nome: string;
  },
  participantes: ParticipantProps[];
  _count: {
    participantes: number;
  }
}

interface CardBolaoProps {
  data: PoolCardProps;
}

export default function CardBolao({ data }: CardBolaoProps) {
  const router = useRouter()
  return (
    <div className="flex p-5 my-1 bg-slate-200  rounded-lg items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{data?.nome} </h3>
        <p className="text-sm">{data?.donoBolao?.nome} </p>
      </div>
      <div>
        <button onClick={() => router.push(`/dashboard/bolao/${data.id}`)} className="p-2 bg-green-600 rounded-md text-white hover:bg-green-500">
          Acessar
        </button>
      </div>
    </div>
  )
}