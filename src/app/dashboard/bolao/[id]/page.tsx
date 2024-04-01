import CardJogosBolao from "@/components/bolao/CardJogosBolao";
import CardBolao from "@/components/bolao/CardJogosBolao";

interface BolaoProps {
  params: {
    id: string;
  }
}

export default function BolaoDetailsPage({ params }: BolaoProps) {
  return (
    <section>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detalhes Bolão {params?.id}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section >
          <CardJogosBolao bolao_id={params.id} />
        </section>
      </main>
    </section>
  )
}
