import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ptBr from "antd/lib/locale/pt_BR";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Futbolões",
  description: "Faça seu palpite e concorra a prêmios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      locale={ptBr}
      theme={{
        token: {
          colorPrimary: "#0c834c",
          colorLink: "#0c834c",
          colorPrimaryBgHover: "rgba(161,198,63,0.2)",
          colorPrimaryBg: "rgba(161,198,63,0.2)",
          colorBgTextActive: "rgba(161,198,63,0.2)",
          controlItemBgActive: "rgba(161,198,63,0.2)",
        },
      }}
    >
      <AuthProvider>
        <html lang="pt" className="h-full bg-gray-100">
          <body className={roboto.className}>
            <main className="h-full">
              <AntdRegistry>{children}</AntdRegistry>
            </main>
          </body>
        </html>
      </AuthProvider>
    </ConfigProvider>
  );
}
