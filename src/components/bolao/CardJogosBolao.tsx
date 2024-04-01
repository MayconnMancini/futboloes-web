"use client"
import { useEffect, useState } from "react";

import { apiClient } from "@/services/api";
import { JogosItem } from "./JogosItem";
const { api } = apiClient;

interface JogoProps {
  id: string,
  data: string,
  timeCasa: string,
  timeFora: string,
  competicao: string,
  logoTimeCasa: string,
  logoTimeFora: string,
  resultGolTimeCasa?: string | null,
  resultGolTimeFora?: string | null,
  country: string | null,
  logo: string,
  flag: string | null,
  statusJogo: string | null,
}

export interface DataJogosProps {
  id: string,
  jogo_id: string;
  bolao_id: string;
  createdAt: string;
  jogo: JogoProps;
}

interface Props {
  bolao_id: string;
  donoBolaoId?: string;
}

export default function CardJogosBolao({ bolao_id, donoBolaoId }: Props) {
  const [jogos, setJogos] = useState<DataJogosProps[]>([]);


  async function fechJogos() {
    try {

      //setIsLoading(true);
      //console.log("ID BOLAO");
      //console.log(bolao_id);
      const response = await api.get(`bolao/${bolao_id}/jogos`);
      setJogos(response.data);
      //console.log(response.data);

    } catch (error) {
      console.log(error);


    } finally {

    }
  }

  useEffect(() => {
    fechJogos();
  }, []);


  return (
    <div>
      <section >
        {
          jogos.map((item) => {
            return (
              <JogosItem data={item} id_bolao={bolao_id} />
            );
          })
        }
      </section>

    </div>
  )
}