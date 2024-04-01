import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link className="text-green-600 text-2xl font-semibold" href="/dashboard">FUTBOLÕES</Link>
      <nav className="flex gap-8 text-gray-500 font-semibold">
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/dashboard/palpites"}>Palpites</Link>
        <Link href={"/dashboard/bolao"}>Bolões</Link>
        <Link href={"/dashboard/ranking"}>Ranking</Link>
        <Link href={"/dashboard/perfil"}>Perfil</Link>
        <Link href={"/"}>Sair</Link>
      </nav>
    </header>
  )
}