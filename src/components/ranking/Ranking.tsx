import { apiClient } from "@/services/api";

const { api } = apiClient;

async function teste() {
  try {
    const response = await api.get(`/ranking/bolao/11`);
    const rankingData = response.data
    console.log(rankingData)
    return rankingData
  } catch (error) {
    console.log(error)
  }
}


export async function Ranking() {
  const data = await teste()

  return (
    <div>
      <pre>{data}</pre>
    </div>
  )


}