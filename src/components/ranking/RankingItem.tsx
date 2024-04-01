
interface RankingItemProps {
  data: ListRankingData;
  index: number
}

export function RankingItem({ data, index }: RankingItemProps) {

  return (
    <div className="flex justify-between my-2 px-5 py-2 border bg-slate-200 rounded-lg">
      <div className="flex justify-start">
        <p className="font-semibold mr-4">{`${index + 1} ª`}</p>
        <p className="text-gray-700">{data.nome}</p>
      </div>
      <p>{`${data.totalPontos} pts `}</p>

    </div>


  )

}