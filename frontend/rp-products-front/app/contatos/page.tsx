"use client";

import { useState } from "react";
import Button from "../components/ui/Button";
import {
  Search,
  UserPlus,
  Users,
  Loader2,
  Edit2,
  Trash2,
} from "lucide-react";
import { Contato } from "../interfaces/contatos-interface";
import { useContatos } from "../hook/useContatosHook";
import ContatoForm from "../components/contatos/contatoForm";

export default function ContatosPage() {
  const [abrirForm, setAbrirForm] = useState(false);
  const [busca, setBusca] = useState("");

  // 🔒 placeholder temporário
  const clienteId = "SEM_CLIENTE"; 

  const {
    contatos,
    loading,
    error,
    addContato,
    updateContato,
    removeContato,
  } = useContatos();

  const contatosFiltrados = contatos.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (c.telefone ?? "").includes(busca) ||
      (c.email ?? "").toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Contatos
              </h1>
              <p className="text-gray-600">
                Gerencie os contatos cadastrados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded-md">
              {contatos.length}{" "}
              {contatos.length === 1 ? "contato" : "contatos"}
            </span>

            {busca && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                {contatosFiltrados.length} encontrado(s)
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={() => setAbrirForm((prev) => !prev)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
        >
          {abrirForm ? (
            <>
              <Users className="w-5 h-5" />
              Voltar para Lista
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Novo Contato
            </>
          )}
        </Button>
      </div>

      {/* Busca */}
      {!abrirForm && (
        <div className="mb-8 max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou email..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {abrirForm ? (
          <div className="p-6">
            <ContatoForm
              onSave={addContato}
              clienteId={clienteId} // ✅ agora não quebra
            />
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Carregando contatos...</p>
          </div>
        ) : contatosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              {busca
                ? "Nenhum contato encontrado"
                : "Nenhum contato cadastrado"}
            </h3>
          </div>
        ) : (
          <ContatosTabela
            contatos={contatosFiltrados}
            onDelete={removeContato}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Tabela de Contatos
--------------------------------------------------------- */
interface ContatosTabelaProps {
  contatos: Contato[];
  onDelete: (id: string) => void;
}

function ContatosTabela({ contatos, onDelete }: ContatosTabelaProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-4 px-6 text-left font-semibold text-gray-700">
              Nome
            </th>
            <th className="py-4 px-6 text-left font-semibold text-gray-700">
              Telefone
            </th>
            <th className="py-4 px-6 text-left font-semibold text-gray-700">
              Email
            </th>
            <th className="py-4 px-6 text-left font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {contatos.map((contato, idx) => (
            <tr
              key={contato.id}
              className={`border-b ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <td className="py-4 px-6">{contato.nome}</td>
              <td className="py-4 px-6">{contato.telefone}</td>
              <td className="py-4 px-6 text-blue-600 underline">
                {contato.email && (
                  <a href={`mailto:${contato.email}`}>
                    {contato.email}
                  </a>
                )}
              </td>
              <td className="py-4 px-6 flex gap-2">
                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>

                <button
                  onClick={() => contato.id && onDelete(contato.id)}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}