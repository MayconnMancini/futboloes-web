import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode
}

export default function Authlayout({ children }: AuthLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}