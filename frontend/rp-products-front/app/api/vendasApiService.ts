import axios from "axios";
import { ResponseTemplateInterface } from "../interfaces/response-templete-interface";
import { Venda } from "../interfaces/vendas-interface";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export class VendaService {
  // Buscar todas as vendas
  async fetchAll(): Promise<Venda[]> {
    const res = await api.get<ResponseTemplateInterface<Venda[]>>(
      "/venda/all"
    );
    return res.data.data || [];
  }

  // Criar nova venda
  async create(data: Partial<Venda>): Promise<Venda> {
    const res = await api.post<ResponseTemplateInterface<Venda>>(
      "/venda/create",
      data
    );

    if (!res.data.status) throw new Error(res.data.message);

    return res.data.data;
  }

  // Atualizar venda existente
  async update(id: string, data: Partial<Venda>): Promise<Venda | null> {
    const res = await api.put<ResponseTemplateInterface<Venda>>(
      "/venda/update",
      { id, ...data }
    );

    return res.data.data || null;
  }

  // Deletar venda
  async delete(id: string): Promise<void> {
    await api.delete<ResponseTemplateInterface<null>>(`/venda/delete/${id}`);
  }

  // Buscar venda por ID
  async fetchById(id: string): Promise<Venda | null> {
    const res = await api.get<ResponseTemplateInterface<Venda>>(
      `/venda/${id}`
    );
    return res.data.data || null;
  }
}