import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-black">
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-black text-white p-6 hidden sm:flex flex-col shadow-sm">
            <h1 className="text-2xl font-bold mb-8 tracking-tight">
              RP System
            </h1>

            <nav className="flex flex-col gap-3">
              <a
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                href="/clientes"
              >
                Clientes
              </a>
              <a
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                href="/contatos"
              >
                Contatos
              </a>
              <a
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                href="#"
              >
                Produtos
              </a>
              <a
                className="text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                href="#"
              >
                Financeiro
              </a>
            </nav>
          </aside>

          {/* MAIN */}
          <main className="flex-1 p-10 bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
