import axios from "axios";
import { ResponseTemplateInterface } from "../interfaces/response-templete-interface";
import { Contato } from "../interfaces/contatos-interface";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export class ContatoService {
  async fetchContatos(): Promise<Contato[]> {
    const res = await api.get<ResponseTemplateInterface<Contato[]>>(
      "/contato/all"
    );
    return res.data.data || [];
  }

  async createContato(data: Partial<Contato>): Promise<Contato> {
    const res = await api.post<ResponseTemplateInterface<Contato>>(
      "/contato/create",
      data
    );

    if (!res.data.status) throw new Error(res.data.message);

    return res.data.data;
  }

  async updateContato(
    id: string,
    data: Partial<Contato>
  ): Promise<Contato | null> {
    const res = await api.put<ResponseTemplateInterface<Contato>>(
      "/contato/update",
      { id, ...data }
    );

    return res.data.data || null;
  }

  async deleteContato(id: string): Promise<void> {
    await api.delete<ResponseTemplateInterface<null>>(
      `/contato/delete/${id}`
    );
  }

  async fetchContatoById(id: string): Promise<Contato | null> {
    const res = await api.get<ResponseTemplateInterface<Contato>>(
      `/contato/${id}`
    );
    return res.data.data || null;
  }
}