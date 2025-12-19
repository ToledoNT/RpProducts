export interface Contato {
  id: string;
  clienteId?: string;

  nome: string;
  sobrenome?: string;
  cargo?: string;
  departamento?: string;

  status?: "Ativo" | "Inativo";

  email?: string;
  telefone?: string;
  celular?: string;
  whatsapp?: string;
  ramal?: string;

  observacoes?: string;
}