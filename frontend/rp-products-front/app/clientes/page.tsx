"use client";

import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import ClienteForm from "../components/clientes/ClienteForm";
import { Search, UserPlus, Users, Loader2, Edit2, Trash2 } from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
}

export default function ClientesPage() {
  const [abrirForm, setAbrirForm] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  const handleToggleForm = () => setAbrirForm(!abrirForm);

  useEffect(() => {
    async function carregarClientes() {
      try {
        const res = await fetch("/api/clientes");
        const data = await res.json();
        setClientes(data ?? []);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone.includes(busca) ||
    c.email.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie os clientes cadastrados no sistema
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded-md">
              {clientes.length} {clientes.length === 1 ? 'cliente' : 'clientes'}
            </span>
            {busca && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                {clientesFiltrados.length} encontrado(s)
              </span>
            )}
          </div>
        </div>

        {/* Botão Novo Cliente */}
        <Button
          onClick={handleToggleForm}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          {abrirForm ? (
            <>
              <Users className="w-5 h-5" />
              Voltar para Lista
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Novo Cliente
            </>
          )}
        </Button>
      </div>

      {/* Busca */}
      {!abrirForm && (
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cliente por nome, telefone ou email..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-900 placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {abrirForm ? (
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Cadastrar Novo Cliente</h2>
              <p className="text-gray-600 mt-1">Preencha os dados do cliente abaixo</p>
            </div>
            <ClienteForm />
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Carregando clientes...</p>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {busca ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
            </h3>
            <p className="text-gray-600 max-w-md mb-6">
              {busca ? 'Tente ajustar sua busca ou ' : ''}Clique em{" "}
              <strong className="text-blue-600">"Novo Cliente"</strong> para cadastrar o primeiro.
            </p>
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-blue-200"
              >
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          <ClientesTabela clientes={clientesFiltrados} />
        )}
      </div>
    </div>
  );
}

/* --- Tabela --- */
interface ClientesTabelaProps {
  clientes: Cliente[];
}

function ClientesTabela({ clientes }: ClientesTabelaProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
              Nome
            </th>
            <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
              Telefone
            </th>
            <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
              Email
            </th>
            <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((cliente, idx) => (
            <tr
              key={cliente.id}
              className={`
                border-b border-gray-100 transition-all duration-150
                ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                hover:bg-blue-50/30
              `}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">
                      {cliente.nome.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{cliente.nome}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-700 font-medium">
                {cliente.telefone}
              </td>
              <td className="py-4 px-6">
                <a 
                  href={`mailto:${cliente.email}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {cliente.email}
                </a>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}