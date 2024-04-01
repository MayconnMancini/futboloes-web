"use client"
import { useEffect, useState } from "react";

import { apiClient } from "@/services/api";
import Image from "next/image";
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

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
  data: DataJogosProps;
  id_bolao: string;
  donoBolaoId?: string;
  //onGuessConfirm: () => void;
  //setGolTimeCasa: (value: string) => void;
  //setGolTimeFora: (value: string) => void;
};

export function JogosItem({ data, id_bolao, donoBolaoId }: Props) {
  const when = dayjs(data.jogo.data).locale(ptBR).format("DD/MM/YYYY HH:mm[h]");

  return (

    <div className="flex flex-col p-3 my-1 bg-slate-200  rounded-lg mb-5 justify-center lg:w-3/4 sm:mx-auto" >
      <div className="flex flex-row items-center border-b-2 border-gray-300 pb-2">
        <Image src={data?.jogo?.logo} width={30} height={30} alt="" />
        <h3 className="text-base font-semibold ml-5 pb">{data?.jogo.country} - {data?.jogo.competicao} </h3>
      </div>

      <div className="flex flex-col  my-4 py-4 justify-between border-b-2 border-gray-300">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <Image src={data.jogo.logoTimeCasa} width={50} height={50} alt="" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm">Resultado</span>
            <div className="flex flex-row items-center">
              <p className="text-3xl font-semibold mr-4" >{data.jogo.resultGolTimeCasa} </p>
              <span>X</span>
              <p className="text-3xl font-semibold ml-4">{data?.jogo.resultGolTimeFora} </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image src={data.jogo.logoTimeFora} width={50} height={50} alt="" />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div>
            <p className="text-sm">{data?.jogo.timeCasa} </p>
          </div>
          <div>
            <p className="text-sm">{data?.jogo.timeFora} </p>
          </div>
        </div>

      </div>




      <div className="flex justify-between gap-5">
        <p>{when}</p>
        <p>{data.jogo.statusJogo}</p>
      </div>
    </div>


  )
}