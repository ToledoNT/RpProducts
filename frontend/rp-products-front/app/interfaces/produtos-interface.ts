// ================= ENUMS =================
export type TipoProduto = "Servico" | "Produto" | "Plano";
export type StatusProduto = "Ativo" | "Inativo";

export type TributacaoProduto = "Padrao" | "Isento" | "Simples";

// ================= INTERFACE =================
export interface Produto {
  id: string;

  // ===== Identificação =====
  nome: string;
  descricao?: string;
  categoria?: string;
  codigoInterno?: string; // SKU
  marca?: string;

  tipo: TipoProduto;
  status: StatusProduto;

  // ===== Financeiro =====
  preco: number;
  precoPromocional?: number;
  custo?: number;
  tributacao?: TributacaoProduto;

  // ===== Estoque =====
  controlaEstoque: boolean;
  estoqueAtual?: number;
  estoqueMinimo?: number;
  unidade?: string; // un, kg, cx, etc

  // ===== Serviço =====
  duracaoMinutos?: number;

  // ===== Operacional =====
  fornecedor?: string;
  observacoes?: string;

  // ===== Auditoria =====
  createdAt?: string;
  updatedAt?: string;
}