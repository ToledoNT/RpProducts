"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ItemVenda, StatusVenda, Venda } from "@/app/interfaces/vendas-interface";
import { User, Package, DollarSign } from "lucide-react";

interface Props {
  clientes: { id: string; nome: string }[];
  produtos: { id: string; nome: string; preco: number }[];
  onSave: (data: Omit<Venda, "id">) => Promise<void>;
  onCancel: () => void;
}

export function VendaForm({ clientes, produtos, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Venda, "id">>({
    clienteId: "",
    vendedorId: "",
    itens: [],
    valorTotal: 0,
    dataVenda: new Date().toISOString().split("T")[0],
    status: "Pendente",
  });

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function addItem() {
    setForm(prev => ({
      ...prev,
      itens: [...prev.itens, { produtoId: "", descricao: "", quantidade: 1, precoUnitario: 0, total: 0 }],
    }));
  }

  function updateItem<K extends keyof ItemVenda>(index: number, key: K, value: ItemVenda[K]) {
    const newItens = [...form.itens];
    newItens[index][key] = value;

    if (key === "quantidade" || key === "precoUnitario") {
      newItens[index].total = newItens[index].quantidade * newItens[index].precoUnitario;
    }

    const totalVenda = newItens.reduce((sum, i) => sum + i.total, 0);
    setForm(prev => ({ ...prev, itens: newItens, valorTotal: totalVenda }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.clienteId) return alert("Selecione o cliente");
    if (form.itens.length === 0) return alert("Adicione pelo menos um item");
    await onSave(form);
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg">
          <DollarSign className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Nova Venda / Pedido</h2>
          <p className="text-gray-600 mt-1">Preencha todas as informações da venda</p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Cliente */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Cliente</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-gray-700">Selecione o Cliente *</label>
            <select
              value={form.clienteId}
              onChange={(e) => update("clienteId", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              required
            >
              <option value="">Selecione</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Itens */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Package className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Itens</h3>
          </div>

          {form.itens.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 p-3 border rounded-lg bg-gray-50">
              <select
                value={item.produtoId}
                onChange={e => {
                  const produto = produtos.find(p => p.id === e.target.value);
                  updateItem(index, "produtoId", e.target.value);
                  updateItem(index, "descricao", produto?.nome ?? "");
                  updateItem(index, "precoUnitario", produto?.preco ?? 0);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-black focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>

              <Input
                type="number"
                value={item.quantidade}
                onChange={e => updateItem(index, "quantidade", Number(e.target.value))}
                placeholder="Quantidade"
              />

              <Input
                type="number"
                value={item.precoUnitario}
                onChange={e => updateItem(index, "precoUnitario", Number(e.target.value))}
                placeholder="Preço unitário"
              />

              <div className="flex items-center justify-center text-black font-medium">
                Total: R$ {item.total.toFixed(2)}
              </div>
            </div>
          ))}

          <Button type="button" onClick={addItem}>
            Adicionar Item
          </Button>
        </div>

        {/* Status e Valor Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <DollarSign className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Resumo</h3>
            </div>

            <Input label="Valor Total" type="number" value={form.valorTotal} readOnly />

            <select
              value={form.status}
              onChange={e => update("status", e.target.value as StatusVenda)}
              className="w-full mt-3 border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Pendente">Pendente</option>
              <option value="Pago Parcial">Pago Parcial</option>
              <option value="Pago">Pago</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Salvar Venda
          </Button>
        </div>
      </form>
    </div>
  );
}