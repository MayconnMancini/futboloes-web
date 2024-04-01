
import Image from "next/image";
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { Button, Col, Form, Input, Row, message } from "antd";
import { useState } from "react";
import { apiClient } from "@/services/api";
const { api } = apiClient;

interface RankingItemProps {
  data: JogoBolaoProps;
  index: number
}

export function JogoPalpite({ data, index }: RankingItemProps) {
  const [form] = Form.useForm();
  const [golTimeCasa, setGolTimeCasa] = useState(data.palpite?.golTimeCasa.toString());
  const [golTimeFora, setGolTimeFora] = useState(data.palpite?.golTimeFora.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [dataLocal, setDataLocal] = useState<JogoBolaoProps>(data);
  //const [palpite, setPalpite] = useState<any>(data.palpite);

  const when = dayjs(data.jogo.data).locale(ptBR).format("DD [de] MMMM [de] YYYY [às] HH:mm[h]");

  async function postData() {
    try {
      await form.validateFields();
    } catch (errors) {
      errors.errorFields.forEach((error: any) => {
        error.errors.forEach((errorMessage: string) => {
          message.error(errorMessage);
        });
      });
      return;
    }

    setIsLoading(true);
    if (!data) {
      setIsLoading(false);
      return;
    }
    //const response = await postNewDriver(data);

    const response = await api.post(`/bolao/${data.bolao_id}/jogos/${data.jogo_id}/palpite`, {
      golTimeCasa: Number(golTimeCasa),
      golTimeFora: Number(golTimeFora),
    });

    if (!response) {
      message.error('Falha ao fazer palpite');
      setIsLoading(false);
      return;
    }
    message.success('Palpite realizado com sucesso');;

    setIsLoading(false);
  }


  return (

    <Row>
      <Col  >
        <Image src={dataLocal?.jogo?.logo || ''} width={30} height={30} alt="" />
        <p className="text-gray-700 ml-3">{dataLocal.jogo.country} - {dataLocal.jogo.competicao}</p>
      </Col>

      <Col>
        <Input id="golTimeCasa" name="golTimeCasa" type="number" value={golTimeCasa} onChange={(e) => setGolTimeCasa(e.target.value)}
          style={{
            width: '50px',
            margin: "0 10px",
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '16px'
          }} />


        <span className="text-md">X</span>


        <Input id="golTimeFora" name="golTimeFora" type="number" value={golTimeFora} onChange={(e) => {
          setGolTimeFora(e.target.value)
        }}
          style={{
            width: '50px',
            margin: "0 10px",
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '16px'
          }} />
      </Col>
    </Row>

  )
}