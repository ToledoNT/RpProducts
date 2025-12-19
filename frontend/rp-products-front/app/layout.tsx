"use client";

import "./globals.css";
import { ReactNode } from "react";
import {
  Users,
  UserPlus,
  Package,
  DollarSign,
  ClipboardList,
  Truck,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-black">
        <div className="flex min-h-screen">

          {/* SIDEBAR */}
          <aside className="w-64 bg-black text-white flex flex-col p-6 shadow-lg hidden sm:flex">
            <div>
              <h1 className="text-2xl font-bold mb-8 tracking-tight">
                RP System
              </h1>

              <nav className="flex flex-col gap-2">
                <a
                  href="/clientes"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <Users size={18} />
                  Clientes
                </a>

                <a
                  href="/contatos"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <UserPlus size={18} />
                  Contatos
                </a>

                <a
                  href="/produtos"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <Package size={18} />
                  Produtos
                </a>

                <a
                  href="/vendas"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <ClipboardList size={18} />
                  Vendas / Pedidos
                </a>

                <a
                  href="/fornecedores"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <Truck size={18} />
                  Fornecedores
                </a>

                <a
                  href="/financeiro"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <DollarSign size={18} />
                  Financeiro
                </a>

                <a
                  href="/estoque"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <Package size={18} />
                  Estoque
                </a>

                <a
                  href="/relatorios"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition"
                >
                  <BarChart2 size={18} />
                  Relatórios
                </a>

                <a
                  href="/configuracoes"
                  className="flex items-center gap-2 text-white hover:bg-gray-800 px-3 py-2 rounded-md transition mt-4 border-t border-gray-700 pt-4"
                >
                  <Settings size={18} />
                  Configurações
                </a>
              </nav>

              {/* Botão de sair um pouco acima do rodapé */}
              <div className="mt-10">
                <button
                  onClick={() => {
                    console.log("Sair da aplicação");
                  }}
                  className="flex items-center gap-2 w-full justify-center text-white bg-red-600 hover:bg-red-700 px-4 py-3 rounded-md transition"
                >
                  <LogOut size={18} />
                  Sair
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 p-10 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
