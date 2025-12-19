"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Package, DollarSign, Layers, Settings, Tag } from "lucide-react";
import {
  Produto,
  TipoProduto,
  StatusProduto,
  TributacaoProduto,
} from "../../interfaces/produtos-interface";

type ProdutoFormProps = {
  onSave: (p: Omit<Produto, "id">) => Promise<Produto>;
};

export default function ProdutoForm({ onSave }: ProdutoFormProps) {
  const [form, setForm] = useState<Omit<Produto, "id">>({
    nome: "",
    descricao: "",
    categoria: "",
    marca: "",
    codigoInterno: "",

    tipo: "Servico",
    status: "Ativo",

    preco: 0,
    precoPromocional: undefined,
    custo: undefined,
    tributacao: "Padrao",

    controlaEstoque: false,
    estoqueAtual: undefined,
    estoqueMinimo: undefined,
    unidade: "un",

    duracaoMinutos: undefined,

    fornecedor: "",
    observacoes: "",
  });

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nome.trim()) {
      alert("Nome do produto é obrigatório");
      return;
    }

    if (form.preco <= 0) {
      alert("Preço deve ser maior que zero");
      return;
    }

    await onSave(form);
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Cadastrar Produto / Serviço
          </h2>
          <p className="text-gray-800 mt-1">
            Preencha todas as informações do produto
          </p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* ===============================
            Identificação
        =============================== */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Tag className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Identificação
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Nome *"
              value={form.nome}
              onChange={(e) => update("nome", e.target.value)}
              required
            />

            <Input
              label="Código Interno (SKU)"
              value={form.codigoInterno}
              onChange={(e) => update("codigoInterno", e.target.value)}
            />

            <Input
              label="Categoria"
              value={form.categoria}
              onChange={(e) => update("categoria", e.target.value)}
            />

            <Input
              label="Marca"
              value={form.marca}
              onChange={(e) => update("marca", e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Tipo *
              </label>
              <select
                value={form.tipo}
                onChange={(e) =>
                  update("tipo", e.target.value as TipoProduto)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           text-gray-900 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Servico">Serviço</option>
                <option value="Produto">Produto</option>
                <option value="Plano">Plano</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as StatusProduto)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           text-gray-900 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <textarea
            value={form.descricao}
            onChange={(e) => update("descricao", e.target.value)}
            placeholder="Descrição do produto ou serviço"
            className="w-full mt-4 px-4 py-3 border rounded-lg
                       text-gray-900 placeholder-gray-500
                       focus:ring-2 focus:ring-blue-500
                       outline-none min-h-[100px]"
          />
        </div>

        {/* ===============================
            Financeiro
        =============================== */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Financeiro
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Preço *"
              type="number"
              value={form.preco}
              onChange={(e) => update("preco", Number(e.target.value))}
            />

            <Input
              label="Preço Promocional"
              type="number"
              value={form.precoPromocional ?? ""}
              onChange={(e) =>
                update(
                  "precoPromocional",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />

            <Input
              label="Custo"
              type="number"
              value={form.custo ?? ""}
              onChange={(e) =>
                update(
                  "custo",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Tributação
              </label>
              <select
                value={form.tributacao}
                onChange={(e) =>
                  update(
                    "tributacao",
                    e.target.value as TributacaoProduto
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           text-gray-900 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Padrao">Padrão</option>
                <option value="Isento">Isento</option>
                <option value="Simples">Simples Nacional</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===============================
            Operacional
        =============================== */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Layers className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Operacional
            </h3>
          </div>

          {form.tipo === "Produto" && (
            <>
              <label className="flex items-center gap-2 mb-4 text-gray-900 font-medium">
                <input
                  type="checkbox"
                  checked={form.controlaEstoque}
                  onChange={(e) =>
                    update("controlaEstoque", e.target.checked)
                  }
                />
                Controlar estoque
              </label>

              {form.controlaEstoque && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Estoque Atual"
                    type="number"
                    value={form.estoqueAtual ?? ""}
                    onChange={(e) =>
                      update(
                        "estoqueAtual",
                        e.target.value
                          ? Number(e.target.value)
                          : undefined
                      )
                    }
                  />

                  <Input
                    label="Estoque Mínimo"
                    type="number"
                    value={form.estoqueMinimo ?? ""}
                    onChange={(e) =>
                      update(
                        "estoqueMinimo",
                        e.target.value
                          ? Number(e.target.value)
                          : undefined
                      )
                    }
                  />

                  <Input
                    label="Unidade"
                    value={form.unidade}
                    onChange={(e) =>
                      update("unidade", e.target.value)
                    }
                  />
                </div>
              )}
            </>
          )}

          {form.tipo === "Servico" && (
            <Input
              label="Duração (minutos)"
              type="number"
              value={form.duracaoMinutos ?? ""}
              onChange={(e) =>
                update(
                  "duracaoMinutos",
                  e.target.value
                    ? Number(e.target.value)
                    : undefined
                )
              }
            />
          )}
        </div>

        {/* ===============================
            Observações
        =============================== */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Settings className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Observações
            </h3>
          </div>

          <textarea
            value={form.observacoes}
            onChange={(e) => update("observacoes", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg
                       text-gray-900 placeholder-gray-500
                       focus:ring-2 focus:ring-blue-500
                       outline-none min-h-[120px]"
            placeholder="Observações internas (não visível para o cliente)"
          />
        </div>

        {/* Botão */}
        <div className="flex justify-end pt-6 border-t">
          <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </div>
  );
}