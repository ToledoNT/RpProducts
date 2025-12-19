export type StatusVenda = "Pendente" | "Pago Parcial" | "Pago" | "Cancelado";

export interface ItemVenda {
  produtoId: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
}

export interface Venda {
  id: string;

  // Relacionamentos
  clienteId: string;
  vendedorId?: string;

  // Dados principais
  itens: ItemVenda[];
  valorTotal: number;
  dataVenda: string;

  // Controle
  status: StatusVenda;

  // Auditoria
  createdAt?: string;
  updatedAt?: string;
}