// Cliente completo
export interface Cliente {
  id: string; // obrigatório, porque toda lista de clientes precisa ter id
  nome: string;
  email: string;
  telefone: string;
  telefone2?: string;
  documento?: string;
  tipoPessoa?: string;
  dataNascimento?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  pais?: string;
  contatoPrincipal?: string;
  emailAlternativo?: string;
  observacoes?: string;
}

// Props do formulário
export interface ClienteFormProps {
  onSave: (cliente: Omit<Cliente, "id">) => Promise<Cliente>;
}