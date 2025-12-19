"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { User, Phone, Mail, FileText } from "lucide-react";
import { Contato } from "../../interfaces/contatos-interface";

/* ----------------------------------
   Tipos auxiliares
---------------------------------- */
type StatusContato = "Ativo" | "Inativo";
type TipoContato =
  | "Comercial"
  | "Financeiro"
  | "Técnico"
  | "Administrativo";

type ContatoFormState = {
  nome: string;
  sobrenome: string;
  cargo: string;
  departamento: string;
  status: StatusContato;

  email: string;
  telefone: string;
  celular: string;
  whatsapp: string;
  ramal: string;

  tipoContato: TipoContato;
  principal: boolean;

  observacoes: string;
};

/* ----------------------------------
   Props
---------------------------------- */
type ContatoFormProps = {
  onSave: (c: Omit<Contato, "id">) => Promise<Contato>;
  clienteId: string; // 🔒 obrigatório
};

export default function ContatoForm({ onSave, clienteId }: ContatoFormProps) {
  const [form, setForm] = useState<ContatoFormState>({
    nome: "",
    sobrenome: "",
    cargo: "",
    departamento: "",
    status: "Ativo",

    email: "",
    telefone: "",
    celular: "",
    whatsapp: "",
    ramal: "",

    tipoContato: "Comercial",
    principal: false,

    observacoes: "",
  });

  /* ----------------------------------
     Update tipado
  ---------------------------------- */
  function update<K extends keyof ContatoFormState>(
    key: K,
    value: ContatoFormState[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  /* ----------------------------------
     Submit
  ---------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    if (form.email && !form.email.includes("@")) {
      alert("E-mail inválido");
      return;
    }

    if (form.principal && !form.email && !form.whatsapp) {
      alert("Contato principal precisa de um e-mail ou WhatsApp");
      return;
    }

    await onSave({
      ...form,
      clienteId,
    });
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-50 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Novo Contato
          </h2>
          <p className="text-gray-900">
            Cadastro completo do contato
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ================= Dados do Contato ================= */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="flex items-center gap-2 font-semibold mb-6 text-gray-900">
            <User className="w-5 h-5 text-blue-600" />
            Dados do Contato
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nome *"
              value={form.nome}
              onChange={e => update("nome", e.target.value)}
              required
            />

            <Input
              label="Sobrenome"
              value={form.sobrenome}
              onChange={e => update("sobrenome", e.target.value)}
            />

            <Input
              label="Cargo"
              value={form.cargo}
              onChange={e => update("cargo", e.target.value)}
            />

            <Input
              label="Departamento"
              value={form.departamento}
              onChange={e => update("departamento", e.target.value)}
            />

            <select
              value={form.status}
              onChange={e =>
                update("status", e.target.value as StatusContato)
              }
              className="border rounded-lg px-4 py-3 text-gray-900 bg-white
                         focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* ================= Comunicação ================= */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="flex items-center gap-2 font-semibold mb-6 text-gray-900">
            <Phone className="w-5 h-5 text-green-600" />
            Comunicação
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="E-mail"
              type="email"
              value={form.email}
              onChange={e => update("email", e.target.value)}
            />

            <Input
              label="Telefone"
              value={form.telefone}
              onChange={e => update("telefone", e.target.value)}
            />

            <Input
              label="Celular"
              value={form.celular}
              onChange={e => update("celular", e.target.value)}
            />

            <Input
              label="WhatsApp"
              value={form.whatsapp}
              onChange={e => update("whatsapp", e.target.value)}
            />

            <Input
              label="Ramal"
              value={form.ramal}
              onChange={e => update("ramal", e.target.value)}
            />
          </div>
        </div>

        {/* ================= Relacionamento ================= */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="flex items-center gap-2 font-semibold mb-6 text-gray-900">
            <Mail className="w-5 h-5 text-purple-600" />
            Relacionamento
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.tipoContato}
              onChange={e =>
                update("tipoContato", e.target.value as TipoContato)
              }
              className="border rounded-lg px-4 py-3 text-gray-900 bg-white
                         focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Comercial">Comercial</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Técnico">Técnico</option>
              <option value="Administrativo">Administrativo</option>
            </select>

            <label className="flex items-center gap-3 text-sm text-gray-900">
              <input
                type="checkbox"
                checked={form.principal}
                onChange={e => update("principal", e.target.checked)}
              />
              Contato principal
            </label>
          </div>
        </div>

        {/* ================= Observações ================= */}
        <div className="bg-white p-6 rounded-xl border">
          <h3 className="flex items-center gap-2 font-semibold mb-6 text-gray-900">
            <FileText className="w-5 h-5 text-amber-600" />
            Observações
          </h3>

          <textarea
            value={form.observacoes}
            onChange={e => update("observacoes", e.target.value)}
            className="w-full border rounded-lg p-4 min-h-[120px]
                       text-gray-900 bg-white placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Salvar Contato
          </Button>
        </div>
      </form>
    </div>
  );
}