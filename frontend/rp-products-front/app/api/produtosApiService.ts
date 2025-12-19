import axios from "axios";
import { ResponseTemplateInterface } from "../interfaces/response-templete-interface";
import { Produto } from "../interfaces/produtos-interface";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export class ProdutoService {
  async fetchProdutos(): Promise<Produto[]> {
    const res = await api.get<ResponseTemplateInterface<Produto[]>>(
      "/produto/all"
    );
    return res.data.data || [];
  }

  async createProduto(data: Partial<Produto>): Promise<Produto> {
    const res = await api.post<ResponseTemplateInterface<Produto>>(
      "/produto/create",
      data
    );

    console.log(data);

    if (!res.data.status) throw new Error(res.data.message);

    return res.data.data;
  }

  async updateProduto(
    id: string,
    data: Partial<Produto>
  ): Promise<Produto | null> {
    const res = await api.put<ResponseTemplateInterface<Produto>>(
      "/produto/update",
      { id, ...data }
    );

    return res.data.data || null;
  }

  async deleteProduto(id: string): Promise<void> {
    await api.delete<ResponseTemplateInterface<null>>(
      `/produto/delete/${id}`
    );
  }

  async fetchProdutoById(id: string): Promise<Produto | null> {
    const res = await api.get<ResponseTemplateInterface<Produto>>(
      `/produto/${id}`
    );
    return res.data.data || null;
  }
}