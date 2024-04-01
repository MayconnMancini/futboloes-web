import Header from "@/components/layout/Header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function Dashboardlayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
