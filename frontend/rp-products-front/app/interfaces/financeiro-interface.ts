export type StatusConta = "Pendente" | "Pago" | "Atrasado" | "Cancelado";

export interface ContaReceber {
  id: string;

  // Relacionamentos
  vendaId?: string;    // Venda ou serviço vinculado
  clienteId?: string;  // Cliente relacionado

  // Dados principais
  codigoConta?: string;      // Código da conta
  descricao: string;         // Descrição da conta
  valorTotal: number;        // Valor total a receber
  valorRecebido?: number;    // Valor já recebido
  dataEmissao?: string;      // Data de emissão
  dataVencimento: string;    // Data de vencimento

  // Controle
  status: StatusConta;       // Status da conta

  // Observações internas
  observacoes?: string;      // Observações adicionais

  // Auditoria
  createdAt?: string;
  updatedAt?: string;
}