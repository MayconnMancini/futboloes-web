"use client";
import Link from "next/link";
import InputMask from "react-input-mask";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";

import { useCallback, useEffect, useState } from "react";
import { maskPhone } from "@/utils/maskPhone";
import { apiCidades } from "@/services/axios";
import { useRouter } from "next/navigation";
const { Option } = Select;

import { apiClient } from "@/services/api";
const { api } = apiClient;

export type Estados = {
  "UF-id": number;
  "UF-sigla": string;
  "UF-nome": string;
  "regiao-id": string;
  "regiao-sigla": string;
  "regiao-nome": string;
};

export type Cidades = {
  "municipio-id": string;
  "municipio-nome": string;
};

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<CreateUser>();
  const [form] = Form.useForm();
  const [estados, setEstados] = useState<Estados[]>([]);
  const [cidades, setCidades] = useState<Cidades[]>([]);
  const [estadoSelected, setEstadoSelected] = useState<Estados>();

  const router = useRouter();

  async function handleSignUp() {
    try {
      setIsLoading(true);
      const resp = await api.post("/signup", {
        nome: data?.nome,
        email: data?.email,
        senha: data?.senha,
        cidade: data?.cidade,
        estado: data?.estado,
        telefone: data?.telefone?.replace(/\D/g, ""),
      });

      if (resp) {
        message.success(resp.data.message, 10);
        form.resetFields();
        setData({});
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.message, 5);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangePhone = useCallback(
    (e: any, prop: string) => {
      setData({ ...data, [prop]: e.target.value });
      form.setFieldValue(prop, e.target.value);
    },
    [data]
  );

  async function getEstados() {
    try {
      const response = await apiCidades.get(
        "localidades/estados?orderBy=nome&view=nivelado"
      );
      if (response) {
        setEstados(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCidades(estadoSelected: any) {
    try {
      if (estadoSelected) {
        const response = await apiCidades.get(
          `localidades/estados/${estadoSelected["UF-id"]}/municipios?view=nivelado`
        );

        if (response) {
          setCidades(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setEstadoSelecionado(sigla: any) {
    const estado = estados.find((item) => {
      return item["UF-sigla"] == sigla;
    });

    if (estado) {
      setData({ ...data, estado: estado["UF-sigla"], cidade: "" });
      setEstadoSelected(estado);
    }
  }

  useEffect(() => {
    getEstados();
  }, []);

  useEffect(() => {
    getCidades(estadoSelected);
  }, [estadoSelected]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-2 pb-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cadastro
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          form={form}
          autoComplete="off"
          layout="vertical"
          onFinish={handleSignUp}
        >
          <Form.Item
            labelAlign="right"
            label={
              <label style={{ color: "rgb(17 24 39)", fontWeight: "500" }}>
                Nome
              </label>
            }
            name="name"
            rules={[
              { required: true, message: "Por favor, preencha com o nome" },
            ]}
          >
            <Input
              size="middle"
              value={data?.nome}
              onChange={(e) => setData({ ...data, nome: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "rgb(17 24 39)", fontWeight: "500" }}>
                Email
              </label>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, preencha com o e-mail",
              },
              {
                type: "email",
                message: "Por favor, informe um e-mail válido",
              },
            ]}
          >
            <Input
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              size="middle"
            />
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "rgb(17 24 39)", fontWeight: "500" }}>
                Telefone
              </label>
            }
            name="telefone"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o telefone do contato",
              },
            ]}
          >
            <InputMask
              // mask={maskPhone(data?.telefone)}
              mask="(99) 9 9999-9999"
              maskChar=""
              value={data?.telefone}
              onChange={(e) => handleChangePhone(e, "telefone")}
            >
              {
                // @ts-ignore
                () => <Input size="middle" />
              }
            </InputMask>
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "rgb(17 24 39)", fontWeight: "500" }}>
                Estado
              </label>
            }
            name="estado"
          >
            <div>
              <Select
                showSearch
                style={{ minWidth: "150px" }}
                placeholder="Selecione o estado"
                optionFilterProp="children"
                onChange={(e) => setEstadoSelecionado(e)}
                value={data?.estado}
              >
                {estados &&
                  estados?.map((estado) => {
                    return (
                      <Option
                        key={estado["UF-sigla"]}
                        value={estado["UF-sigla"]}
                      >
                        {estado["UF-nome"]}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            label={
              <label style={{ color: "rgb(17 24 39)", fontWeight: "500" }}>
                Cidade
              </label>
            }
            name="cidade"
          >
            <div>
              <Select
                showSearch
                style={{ minWidth: "150px" }}
                placeholder="Selecione um bolão"
                optionFilterProp="children"
                onChange={(e) => {
                  console.log("e=> ", e);
                  setData({ ...data, cidade: e });
                }}
                value={data?.cidade}
              >
                {cidades &&
                  cidades?.map((cidade) => {
                    return (
                      <Option
                        key={cidade["municipio-nome"]}
                        value={cidade["municipio-nome"]}
                      >
                        {cidade["municipio-nome"]}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            labelAlign="right"
            label={
              <label style={{ color: "rgb(17 24 39)", fontWeight: "500" }}>
                Senha
              </label>
            }
            name="senha"
            rules={[
              { required: true, message: "Por favor, preencha com a senha" },
            ]}
          >
            <Input.Password
              size="middle"
              value={data?.senha}
              onChange={(e) => setData({ ...data, senha: e.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              loading={isLoading}
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já possui uma conta?{" "}
          <Link
            href="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
