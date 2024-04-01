type PoolCardProps = {
  id: string;
  codigo: string;
  nome: string;
  donoBolaoId: string;
  createdAt: string;
  donoBolao: {
    nome: string;
  };
  participantes: ParticipantProps[];
  _count: {
    participantes: number;
  };
};

type PalpiteProps = {
  id: string | undefined;
  jogoBolao_id: string;
  pontuacao: number | null;
  participante_id: string;
  golTimeCasa: number;
  golTimeFora: number;
};

type JogoProps = {
  id: string;
  data: string;
  timeCasa: string;
  timeFora: string;
  logoTimeCasa: string;
  logoTimeFora: string;
  resultGolTimeCasa: string | null;
  resultGolTimeFora: string | null;
  country: string | null;
  logo: string | null;
  flag: string | null;
  competicao: string;
  statusJogo: string | null;
  palpite: null | PalpiteProps;
};

type JogoBolaoProps = {
  id: string;
  jogo_id: string;
  bolao_id: string;
  createdAt: string;
  jogo: JogoProps;
  palpite: null | PalpiteProps;
};
