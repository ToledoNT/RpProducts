"use client";

import { useState } from "react";
import { User, CreditCard, Calendar, FileText } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ContaReceber, StatusConta } from "@/app/interfaces/financeiro-interface";

interface Props {
  onSave: (data: Omit<ContaReceber, "id">) => Promise<void>;
  onCancel: () => void;
  clientes: { id: string; nome: string }[]; // Lista de clientes para select
  vendas: { id: string; descricao: string }[]; // Lista de vendas para select
}

export function ContaReceberForm({ onSave, onCancel, clientes, vendas }: Props) {
  const [form, setForm] = useState<Omit<ContaReceber, "id">>({
    clienteId: "",
    vendaId: "",
    codigoConta: "",
    descricao: "",
    valorTotal: 0,
    valorRecebido: 0,
    dataEmissao: "",
    dataVencimento: "",
    status: "Pendente",
    observacoes: "",
  });

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.clienteId) {
      alert("Selecione um cliente");
      return;
    }
    if (!form.valorTotal || form.valorTotal <= 0) {
      alert("Informe um valor válido");
      return;
    }
    if (!form.dataVencimento) {
      alert("Informe a data de vencimento");
      return;
    }
    await onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Nova Conta a Receber
      </h2>

      {/* ===============================
          Identificação
      =============================== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Identificação</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Cliente *
            </label>
            <select
              value={form.clienteId}
              onChange={e => update("clienteId", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Selecione o cliente</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Venda / Serviço
            </label>
            <select
              value={form.vendaId}
              onChange={e => update("vendaId", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Selecione a venda</option>
              {vendas.map(v => (
                <option key={v.id} value={v.id}>{v.descricao}</option>
              ))}
            </select>
          </div>

          <Input
            label="Código da Conta"
            value={form.codigoConta}
            onChange={e => update("codigoConta", e.target.value)}
          />

          <Input
            label="Descrição"
            value={form.descricao}
            onChange={e => update("descricao", e.target.value)}
            placeholder="Ex: Venda de serviços"
          />
        </div>
      </div>

      {/* ===============================
          Valores e Datas
      =============================== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <CreditCard className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Valores e Datas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Valor Total *"
            type="number"
            value={form.valorTotal}
            onChange={e => update("valorTotal", Number(e.target.value))}
            required
          />

          <Input
            label="Valor Recebido"
            type="number"
            value={form.valorRecebido}
            onChange={e => update("valorRecebido", Number(e.target.value))}
          />

          <Input
            label="Data de Emissão"
            type="date"
            value={form.dataEmissao}
            onChange={e => update("dataEmissao", e.target.value)}
          />

          <Input
            label="Data de Vencimento *"
            type="date"
            value={form.dataVencimento}
            onChange={e => update("dataVencimento", e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={e => update("status", e.target.value as StatusConta)}
              className="w-full px-4 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Pendente">Pendente</option>
              <option value="Pago">Pago</option>
              <option value="Atrasado">Atrasado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===============================
          Observações
      =============================== */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <FileText className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">Observações</h3>
        </div>

        <textarea
          value={form.observacoes}
          onChange={e => update("observacoes", e.target.value)}
          className="w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px]"
          placeholder="Observações internas (não visível para o cliente)"
        />
      </div>

      {/* ===============================
          Ações
      =============================== */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <Button type="submit">Salvar Conta</Button>
      </div>
    </form>
  );
}