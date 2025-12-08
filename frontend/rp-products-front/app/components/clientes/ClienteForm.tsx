"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { User, MapPin, Phone, FileText, Building } from "lucide-react";

export default function ClienteForm() {
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

  function update(key: string, value: string | boolean) {
    setForm({ ...form, [key]: value });
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cadastrar Novo Cliente</h2>
          <p className="text-gray-600 mt-1">Preencha todas as informações do cliente</p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Dados Pessoais / Jurídicos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Dados Pessoais / Empresa</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tipo de Pessoa primeiro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Pessoa *
              </label>
              <select
                value={form.tipoPessoa}
                onChange={e => update("tipoPessoa", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="Física">Pessoa Física</option>
                <option value="Jurídica">Pessoa Jurídica</option>
              </select>
            </div>

            {/* Nome ou Razão Social */}
            <Input
              label={form.tipoPessoa === "Física" ? "Nome Completo *" : "Razão Social *"}
              placeholder={form.tipoPessoa === "Física" ? "Digite o nome completo" : "Nome da empresa"}
              value={form.nome}
              onChange={e => update("nome", e.target.value)}
              required
            />

            {/* Nome Fantasia */}
            {form.tipoPessoa === "Jurídica" && (
              <Input
                label="Nome Fantasia"
                placeholder="Nome de exibição da empresa"
                value={form.nomeFantasia}
                onChange={e => update("nomeFantasia", e.target.value)}
              />
            )}

            {/* E-mail */}
            <Input
              label="E-mail *"
              type="email"
              placeholder="exemplo@email.com"
              value={form.email}
              onChange={e => update("email", e.target.value)}
              required
            />

            {/* Telefones */}
            <Input
              label="Telefone *"
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={e => update("telefone", e.target.value)}
              required
            />
            <Input
              label="Telefone 2"
              placeholder="(11) 99999-9999"
              value={form.telefone2}
              onChange={e => update("telefone2", e.target.value)}
            />

            {/* CPF/CNPJ */}
            <Input
              label={form.tipoPessoa === "Física" ? "CPF *" : "CNPJ *"}
              placeholder={form.tipoPessoa === "Física" ? "000.000.000-00" : "00.000.000/0000-00"}
              value={form.documento}
              onChange={e => update("documento", e.target.value)}
              required
            />

            {/* Data de Nascimento / Abertura */}
            <Input
              label={form.tipoPessoa === "Física" ? "Data de Nascimento" : "Data de Abertura"}
              type="date"
              value={form.tipoPessoa === "Física" ? form.dataNascimento : form.abertura}
              onChange={e => update(form.tipoPessoa === "Física" ? "dataNascimento" : "abertura", e.target.value)}
            />

            {/* Dados PJ adicionais */}
            {form.tipoPessoa === "Jurídica" && (
              <>
                <Input label="Inscrição Estadual" placeholder="Inscrição Estadual" value={form.inscricaoEstadual} onChange={e => update("inscricaoEstadual", e.target.value)} />
                <Input label="CNAE Principal" placeholder="CNAE principal" value={form.cnaePrincipal} onChange={e => update("cnaePrincipal", e.target.value)} />
                <Input label="CNAEs Secundários" placeholder="CNAEs secundários" value={form.cnaesSecundarios} onChange={e => update("cnaesSecundarios", e.target.value)} />
                <Input label="Natureza Jurídica" placeholder="Natureza Jurídica" value={form.naturezaJuridica} onChange={e => update("naturezaJuridica", e.target.value)} />
                <Input label="Capital Social" placeholder="Capital Social" value={form.capitalSocial} onChange={e => update("capitalSocial", e.target.value)} />
              </>
            )}
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Endereço</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Rua" placeholder="Nome da rua" value={form.rua} onChange={e => update("rua", e.target.value)} />
            <Input label="Número" placeholder="123" value={form.numero} onChange={e => update("numero", e.target.value)} />
            <Input label="Complemento" placeholder="Apto 101, Bloco B" value={form.complemento} onChange={e => update("complemento", e.target.value)} />
            <Input label="Bairro" placeholder="Centro" value={form.bairro} onChange={e => update("bairro", e.target.value)} />
            <Input label="Cidade" placeholder="São Paulo" value={form.cidade} onChange={e => update("cidade", e.target.value)} />
            <Input label="Estado" placeholder="SP" value={form.estado} onChange={e => update("estado", e.target.value)} />
            <Input label="CEP" placeholder="00000-000" value={form.cep} onChange={e => update("cep", e.target.value)} />
            <Input label="País" value={form.pais} onChange={e => update("pais", e.target.value)} />
          </div>
        </div>

        {/* Contato e Observações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Phone className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Contato</h3>
            </div>
            <div className="space-y-4">
              <Input label="Contato Principal" placeholder="Nome do contato" value={form.contatoPrincipal} onChange={e => update("contatoPrincipal", e.target.value)} />
              <Input label="E-mail Alternativo" type="email" placeholder="contato@email.com" value={form.emailAlternativo} onChange={e => update("emailAlternativo", e.target.value)} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <FileText className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Observações</h3>
            </div>
            <textarea
              value={form.observacoes}
              onChange={e => update("observacoes", e.target.value)}
              placeholder="Adicione observações importantes sobre o cliente..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[120px] resize-y"
              rows={4}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Button type="button" className="px-8 py-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Cancelar</Button>
          <Button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg">Salvar Cliente</Button>
        </div>
      </form>
    </div>
  );
}