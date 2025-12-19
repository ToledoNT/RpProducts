import axios from "axios";
import { ResponseTemplateInterface } from "../interfaces/response-templete-interface";
import { ContaReceber } from "../interfaces/financeiro-interface";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export class ContaReceberService {
  async fetchAll(): Promise<ContaReceber[]> {
    const res = await api.get<ResponseTemplateInterface<ContaReceber[]>>(
      "/financeiro/contas-receber"
    );
    return res.data.data || [];
  }

  async create(data: Omit<ContaReceber, "id">): Promise<ContaReceber> {
    const res = await api.post<ResponseTemplateInterface<ContaReceber>>(
      "/financeiro/contas-receber/create",
      data
    );

    if (!res.data.status) throw new Error(res.data.message);
    return res.data.data;
  }

  async update(
    id: string,
    data: Partial<ContaReceber>
  ): Promise<ContaReceber | null> {
    const res = await api.put<ResponseTemplateInterface<ContaReceber>>(
      "/financeiro/contas-receber/update",
      { id, ...data }
    );

    return res.data.data || null;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/financeiro/contas-receber/delete/${id}`);
  }
}