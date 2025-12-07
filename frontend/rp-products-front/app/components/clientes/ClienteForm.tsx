"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { User, MapPin, Phone, FileText } from "lucide-react";

export default function ClienteForm() {
  const [form, setForm] = useState({
    // Dados Pessoais
    nome: "",
    email: "",
    telefone: "",
    telefone2: "",
    documento: "",
    tipoPessoa: "Física",
    dataNascimento: "",

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
        
        {/* Dados Pessoais */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Dados Pessoais</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input 
              label="Nome Completo *" 
              placeholder="Digite o nome completo"
              value={form.nome} 
              onChange={e => update("nome", e.target.value)} 
              required
            />
            <Input 
              label="E-mail *" 
              type="email"
              placeholder="exemplo@email.com"
              value={form.email} 
              onChange={e => update("email", e.target.value)} 
              required
            />
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
            <Input 
              label="CPF/CNPJ *" 
              placeholder="000.000.000-00"
              value={form.documento} 
              onChange={e => update("documento", e.target.value)} 
              required
            />
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
            <Input 
              label="Data de Nascimento/Abertura" 
              type="date"
              value={form.dataNascimento} 
              onChange={e => update("dataNascimento", e.target.value)} 
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Endereço</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input 
              label="Rua" 
              placeholder="Nome da rua"
              value={form.rua} 
              onChange={e => update("rua", e.target.value)} 
            />
            <Input 
              label="Número" 
              placeholder="123"
              value={form.numero} 
              onChange={e => update("numero", e.target.value)} 
            />
            <Input 
              label="Complemento" 
              placeholder="Apto 101, Bloco B"
              value={form.complemento} 
              onChange={e => update("complemento", e.target.value)} 
            />
            <Input 
              label="Bairro" 
              placeholder="Centro"
              value={form.bairro} 
              onChange={e => update("bairro", e.target.value)} 
            />
            <Input 
              label="Cidade" 
              placeholder="São Paulo"
              value={form.cidade} 
              onChange={e => update("cidade", e.target.value)} 
            />
            <Input 
              label="Estado" 
              placeholder="SP"
              value={form.estado} 
              onChange={e => update("estado", e.target.value)} 
            />
            <Input 
              label="CEP" 
              placeholder="00000-000"
              value={form.cep} 
              onChange={e => update("cep", e.target.value)} 
            />
            <Input 
              label="País" 
              value={form.pais} 
              onChange={e => update("pais", e.target.value)} 
            />
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contato */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Phone className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Contato</h3>
            </div>
            <div className="space-y-4">
              <Input 
                label="Contato Principal" 
                placeholder="Nome do contato"
                value={form.contatoPrincipal} 
                onChange={e => update("contatoPrincipal", e.target.value)} 
              />
              <Input 
                label="E-mail Alternativo" 
                type="email"
                placeholder="contato@email.com"
                value={form.emailAlternativo} 
                onChange={e => update("emailAlternativo", e.target.value)} 
              />
            </div>
          </div>

          {/* Observações */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <FileText className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-900">Observações</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea 
                value={form.observacoes} 
                onChange={e => update("observacoes", e.target.value)}
                placeholder="Adicione observações importantes sobre o cliente..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[120px] resize-y"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            className="px-8 py-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg"
          >
            Salvar Cliente
          </Button>
        </div>
      </form>
    </div>
  );
}