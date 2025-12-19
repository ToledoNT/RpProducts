"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, Wallet } from "lucide-react";
import { useContasReceber } from "../hook/useContaReceber";
import { ContaReceberForm } from "../components/financeiro/contaReceberForm";

export default function FinanceiroPage() {
  const { contas, loading, fetchContas, addConta } = useContasReceber();
  const [abrirForm, setAbrirForm] = useState(false);

  // Simulação de clientes e vendas
  const clientes = [
    { id: "1", nome: "Cliente A" },
    { id: "2", nome: "Cliente B" },
  ];
  const vendas = [
    { id: "1", descricao: "Venda 1" },
    { id: "2", descricao: "Venda 2" },
  ];

  useEffect(() => {
    fetchContas();
  }, [fetchContas]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Contas a Receber
          </h1>
          <p className="text-gray-500">
            Gerencie cobranças e recebimentos
          </p>
        </div>

        <button
          onClick={() => setAbrirForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <Plus size={18} />
          Nova cobrança
        </button>
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {abrirForm ? (
          <div className="p-6">
            <ContaReceberForm
              onSave={async data => {
                await addConta(data);
                setAbrirForm(false);
              }}
              onCancel={() => setAbrirForm(false)}
              clientes={clientes}   // <- aqui
              vendas={vendas}       // <- aqui
            />
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Carregando financeiro...</p>
          </div>
        ) : contas.length === 0 ? (
          <div className="text-center py-16">
            <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              Nenhuma cobrança cadastrada
            </h3>
            <p className="text-gray-500">
              Crie sua primeira conta a receber
            </p>
          </div>
        ) : (
          <div className="p-6 text-gray-600">
            {/* Tabela vem depois */}
            Total de cobranças: {contas.length}
          </div>
        )}
      </div>
    </div>
  );
}