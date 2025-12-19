"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { VendaForm } from "../components/vendas/vendaForm";
import { useVendas } from "../hook/useVendasHook";

export default function VendasPage() {
  const { vendas, loading, fetchVendas, addVenda } = useVendas();
  const [abrirForm, setAbrirForm] = useState(false);

  useEffect(() => {
    fetchVendas();
  }, [fetchVendas]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vendas / Pedidos</h1>
        <button
          onClick={() => setAbrirForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <Plus size={18} />
          Nova Venda
        </button>
      </div>

      {/* Conteúdo */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {abrirForm ? (
          <div className="p-6">
            <VendaForm
              clientes={[]} // depois conecta com o hook de clientes
              produtos={[]} // depois conecta com o hook de produtos
              onSave={async data => {
                await addVenda(data);
                setAbrirForm(false);
              }}
              onCancel={() => setAbrirForm(false)}
            />
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Carregando vendas...</p>
          </div>
        ) : vendas.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900">
              Nenhuma venda cadastrada
            </h3>
            <p className="text-gray-500">Crie sua primeira venda</p>
          </div>
        ) : (
          <div className="p-6 text-gray-600">
            Total de vendas: {vendas.length}
          </div>
        )}
      </div>
    </div>
  );
}