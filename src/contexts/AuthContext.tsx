"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { cookies } from "next/headers";

const { api } = apiClient;
import { apiClient } from "@/services/api";
import { useRouter } from "next/navigation";

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string | number;
  nome: string;
  email: string;
  cidade: string;
  estado: string;
  telefone: string;
  googleId: string;
  avatarUrl: string;
  isAdmin: boolean;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserProps | null;
  bolaoSelected: string | number | null;
  setarBolaoSelected: (id: any) => Promise<void>;
  signIn: (email: string, senha: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProps | null>(null);
  const [bolaoSelected, setBolaoSelected] = useState<any>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    console.log("use effect auth context");
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const { "futboloes.token": token } = parseCookies();
      if (!token) {
        router.push("/");
      }
      if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const userInfoResponse = await api.get("/me");

        if (userInfoResponse) {
          setUser(userInfoResponse.data.user);
        } else {
          destroyCookie(undefined, "futboloes.token");
          router.push("/");
        }
      }
    } catch (error) {
      console.log("errro", error);
    }
  }

  async function signIn(email: string, senha: string) {
    try {
      //setIsUserLoading(true);
      const tokenResponse = await api.post("/login", {
        email: email,
        senha: senha,
      });

      console.log("tokenResponse", tokenResponse);

      if (!tokenResponse.data) {
        throw new Error("Erro ao fazer login");
      }

      setCookie(undefined, "futboloes.token", tokenResponse.data.token, {
        maxAge: 60 * 60 * 24 * 7, // 24 hrs
        path: "/",
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data.token}`;
      console.log(
        "setei o token na api, => ",
        api.defaults.headers.common["Authorization"]
      );
      const userInfoResponse = await api.get("/me");
      console.log("fiz o userInfoResponse");
      setUser(userInfoResponse.data.user);

      router.push("/dashboard");
    } catch (error: any) {
      console.log("erro => " + error.response?.data?.message);
      //alert(error.response?.data?.message)
      //throw error;
      /*
      Toast.show(error.response?.data?.message, {
        duration: Toast.durations.LONG,
        position: 50,
        textColor: 'white',
        opacity: 1,
        backgroundColor: 'red',
        textStyle: {
          fontWeight: 'bold',
        }
      })
      */
    } finally {
      //setIsUserLoading(false);
    }
  }

  async function setarBolaoSelected(id: any) {
    setBolaoSelected(id);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        bolaoSelected,
        signIn,
        setarBolaoSelected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
