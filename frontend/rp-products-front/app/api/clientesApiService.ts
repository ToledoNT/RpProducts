import axios from "axios";
import { ResponseTemplateInterface } from "../interfaces/response-templete-interface";
import { Cliente } from "../interfaces/clientes-interface";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export class ClienteService {
  async fetchClientes(): Promise<Cliente[]> {
    const res = await api.get<ResponseTemplateInterface<Cliente[]>>("/cliente/all");
    return res.data.data || [];
  }

  async createCliente(data: Partial<Cliente>): Promise<Cliente> {
    const res = await api.post<ResponseTemplateInterface<Cliente>>(
      "/cliente/create",
      data
    );
console.log(data)
    if (!res.data.status) throw new Error(res.data.message);

    return res.data.data;
  }

  async updateCliente(id: string, data: Partial<Cliente>): Promise<Cliente | null> {
    const res = await api.put<ResponseTemplateInterface<Cliente>>(
      "/cliente/update",
      { id, ...data }
    );

    return res.data.data || null;
  }

  async deleteCliente(id: string): Promise<void> {
    await api.delete<ResponseTemplateInterface<null>>(`/cliente/delete/${id}`);
  }

  async fetchClienteById(id: string): Promise<Cliente | null> {
    const res = await api.get<ResponseTemplateInterface<Cliente>>(`/cliente/${id}`);
    return res.data.data || null;
  }
}