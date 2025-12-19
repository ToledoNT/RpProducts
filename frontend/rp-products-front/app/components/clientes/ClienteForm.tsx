"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { User, MapPin, Phone, FileText, Building } from "lucide-react";
import { Cliente } from "../../interfaces/clientes-interface";

/* ----------------------------------
   Props (ESSENCIAL)
---------------------------------- */
type ClienteFormProps = {
  onSave: (c: Omit<Cliente, "id">) => Promise<Cliente>;
};

export default function ClienteForm({ onSave }: ClienteFormProps) {
  const [form, setForm] = useState({
    // Dados Pessoais / Empresa
    tipoPessoa: "Física",
    nome: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    telefone2: "",
    documento: "",
    dataNascimento: "",

    // Dados PJ adicionais
    cnaePrincipal: "",
    cnaesSecundarios: "",
    inscricaoEstadual: "",
    capitalSocial: "",
    naturezaJuridica: "",
    abertura: "",

    // Endereço
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    pais: "Brasil",

    // Contato
    contatoPrincipal: "",
    emailAlternativo: "",

    // Observações
    observacoes: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  /* ----------------------------------
     SUBMIT (ESSENCIAL)
  ---------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onSave({
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      // mantenha mínimo aqui — pode expandir depois
    });
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Cadastrar Novo Cliente
          </h2>
          <p className="text-gray-600 mt-1">
            Preencha todas as informações do cliente
          </p>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* ===============================
            Dados Pessoais / Jurídicos
        =============================== */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Dados Pessoais / Empresa
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Pessoa *
              </label>
              <select
                value={form.tipoPessoa}
                onChange={(e) => update("tipoPessoa", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Física">Pessoa Física</option>
                <option value="Jurídica">Pessoa Jurídica</option>
              </select>
            </div>

            <Input
              label={
                form.tipoPessoa === "Física"
                  ? "Nome Completo *"
                  : "Razão Social *"
              }
              placeholder={
                form.tipoPessoa === "Física"
                  ? "Digite o nome completo"
                  : "Nome da empresa"
              }
              value={form.nome}
              onChange={(e) => update("nome", e.target.value)}
              required
            />

            {form.tipoPessoa === "Jurídica" && (
              <Input
                label="Nome Fantasia"
                placeholder="Nome de exibição da empresa"
                value={form.nomeFantasia}
                onChange={(e) => update("nomeFantasia", e.target.value)}
              />
            )}

            <Input
              label="E-mail *"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />

            <Input
              label="Telefone *"
              value={form.telefone}
              onChange={(e) => update("telefone", e.target.value)}
              required
            />

            <Input
              label="Telefone 2"
              value={form.telefone2}
              onChange={(e) => update("telefone2", e.target.value)}
            />

            <Input
              label={form.tipoPessoa === "Física" ? "CPF *" : "CNPJ *"}
              value={form.documento}
              onChange={(e) => update("documento", e.target.value)}
              required
            />
          </div>
        </div>

        {/* ===============================
            Endereço
        =============================== */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Endereço
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Rua" value={form.rua} onChange={(e) => update("rua", e.target.value)} />
            <Input label="Número" value={form.numero} onChange={(e) => update("numero", e.target.value)} />
            <Input label="Complemento" value={form.complemento} onChange={(e) => update("complemento", e.target.value)} />
            <Input label="Bairro" value={form.bairro} onChange={(e) => update("bairro", e.target.value)} />
            <Input label="Cidade" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} />
            <Input label="Estado" value={form.estado} onChange={(e) => update("estado", e.target.value)} />
            <Input label="CEP" value={form.cep} onChange={(e) => update("cep", e.target.value)} />
            <Input label="País" value={form.pais} onChange={(e) => update("pais", e.target.value)} />
          </div>
        </div>

        {/* ===============================
            Contato + Observações
        =============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Phone className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Contato
              </h3>
            </div>

            <Input
              label="Contato Principal"
              value={form.contatoPrincipal}
              onChange={(e) => update("contatoPrincipal", e.target.value)}
            />

            <Input
              label="E-mail Alternativo"
              type="email"
              value={form.emailAlternativo}
              onChange={(e) => update("emailAlternativo", e.target.value)}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <FileText className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Observações
              </h3>
            </div>

            <textarea
  value={form.observacoes}
  onChange={(e) => update("observacoes", e.target.value)}
  className="w-full px-4 py-3 border rounded-lg 
             text-gray-900 placeholder-gray-400
             focus:ring-2 focus:ring-blue-500 
             outline-none min-h-[120px]"
  placeholder="Digite observações sobre o cliente..."
/>


          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="submit">
            Salvar Cliente
          </Button>
        </div>
      </form>
    </div>
  );
}