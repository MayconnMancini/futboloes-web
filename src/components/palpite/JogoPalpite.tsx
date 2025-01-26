import Image from "next/image";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { Button, Col, Form, Input, Row, message } from "antd";
import { useState } from "react";
import { apiClient } from "@/services/api";
const { api } = apiClient;

interface RankingItemProps {
  data: JogoBolaoProps;
  index: number;
}

export function JogoPalpite({ data, index }: RankingItemProps) {
  const [form] = Form.useForm();
  const [golTimeCasa, setGolTimeCasa] = useState(
    data.palpite?.golTimeCasa.toString()
  );
  const [golTimeFora, setGolTimeFora] = useState(
    data.palpite?.golTimeFora.toString()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [dataLocal, setDataLocal] = useState<JogoBolaoProps>(data);
  //const [palpite, setPalpite] = useState<any>(data.palpite);

  const when = dayjs(data.jogo.data)
    .locale(ptBR)
    .format("DD [de] MMMM [de] YYYY [às] HH:mm[h]");

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

    try {
      setIsLoading(true);

      if (!golTimeCasa || !golTimeFora) {
        message.warning("Preencha o palpite");
        return;
      }
      //const response = await postNewDriver(data);

      const response = await api.post(
        `/bolao/${data.bolao_id}/jogos/${data.jogo_id}/palpite`,
        {
          golTimeCasa: Number(golTimeCasa),
          golTimeFora: Number(golTimeFora),
        }
      );

      if (!response) {
        message.error("Falha ao fazer palpite");
        setIsLoading(false);
        return;
      }
      message.success("Palpite realizado com sucesso");
    } catch (error) {
      console.log(error.response.data);
      message.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Row className="my-2 px-5 py-2  bg-slate-200 rounded-lg">
      <Col
        xs={24}
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          borderBottom: "1px solid #efefef",
          margin: "5px 0",
          paddingBottom: "5px",
        }}
      >
        <Image
          src={dataLocal?.jogo?.logo || ""}
          width={30}
          height={30}
          alt=""
        />
        <div>
          <p className="text-gray-700 ml-3">
            {dataLocal.jogo.country} - {dataLocal.jogo.competicao}
          </p>
        </div>
      </Col>

      <Col
        xs={24}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p className="text-gray-700 font-semibold text-lg">
          {dataLocal.jogo.timeCasa} vs. {dataLocal.jogo.timeFora}
        </p>
        <span className="text-sm">{when}</span>
      </Col>

      <Col xs={24}>
        <Form form={form} autoComplete="off">
          <Row justify="center">
            <Col
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "15px 0",
              }}
            >
              <Image
                src={dataLocal?.jogo?.logoTimeCasa || ""}
                width={30}
                height={30}
                alt=""
              />
              <Col>
                <Form.Item
                  rules={[{ required: true, type: "number" }]}
                  style={{ margin: 0, padding: 0 }}
                >
                  <Input
                    disabled={
                      dayjs().format() >
                      dayjs(dataLocal.jogo.data).locale(ptBR).format()
                    }
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                    id="golTimeCasa"
                    name="golTimeCasa"
                    type="number"
                    value={golTimeCasa}
                    onChange={(e) => setGolTimeCasa(e.target.value)}
                    style={{
                      width: "50px",
                      margin: "0 10px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  />
                </Form.Item>
              </Col>
              <span className="text-md">X</span>
              <Col>
                <Form.Item
                  rules={[{ required: true, type: "number" }]}
                  style={{ margin: 0, padding: 0 }}
                >
                  <Input
                    disabled={
                      dayjs().format() >
                      dayjs(dataLocal.jogo.data).locale(ptBR).format()
                    }
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                    id="golTimeFora"
                    name="golTimeFora"
                    type="number"
                    value={golTimeFora}
                    onChange={(e) => {
                      setGolTimeFora(e.target.value);
                    }}
                    style={{
                      width: "50px",
                      margin: "0 10px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  />
                </Form.Item>
              </Col>
              <Image
                src={dataLocal?.jogo?.logoTimeFora || ""}
                width={30}
                height={30}
                alt=""
              />
            </Col>

            <Col
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Form.Item>
                <Button
                  size="middle"
                  type={
                    dataLocal.palpite &&
                    dayjs().format() <
                      dayjs(dataLocal.jogo.data).locale(ptBR).format()
                      ? "default"
                      : "primary"
                  }
                  loading={isLoading}
                  htmlType="submit"
                  onClick={postData}
                  disabled={
                    dayjs().format() >
                    dayjs(dataLocal.jogo.data).locale(ptBR).format()
                  }
                >
                  {dataLocal.palpite &&
                  dayjs().format() <
                    dayjs(dataLocal.jogo.data).locale(ptBR).format()
                    ? "Atualizar palpite"
                    : "Palpitar"}
                </Button>
              </Form.Item>
            </Col>

            <hr />

            <Col xs={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  //alignItems: "center",
                  borderTop: "1px solid #efefef",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p>Resultado</p>
                  <div style={{ fontWeight: "bold" }}>
                    <>
                      {dataLocal?.jogo?.resultGolTimeCasa !== null ? (
                        <>
                          <span>{dataLocal?.jogo?.resultGolTimeCasa}</span>
                          <span>{` X `}</span>
                          <span>{dataLocal?.jogo?.resultGolTimeFora}</span>
                        </>
                      ) : null}
                    </>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p className="">Pontos</p>
                  <div
                    style={{
                      fontWeight: "bold",
                      color:
                        dataLocal.palpite?.pontuacao == 21
                          ? "green"
                          : dataLocal.palpite?.pontuacao == 10
                          ? "blue"
                          : "red",
                    }}
                  >
                    <span>{dataLocal.palpite?.pontuacao}</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
